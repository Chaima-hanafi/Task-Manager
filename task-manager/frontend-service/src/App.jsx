import { useState, useEffect } from 'react';
import './App.css';

const API_URL = `http://${import.meta.env.VITE_TASK_IP}:4001`;
const USER_API_URL = `http://${import.meta.env.VITE_USER_IP}:4000/api/users`;
function App() {
  // États pour l'authentification
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // États pour les formulaires d'authentification
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // États pour les tâches
  const [tasks, setTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // États pour le formulaire de tâche
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  // Charger les tâches au démarrage si connecté
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  // Fonction pour récupérer les tâches
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  // Fonction d'inscription
  const handleRegister = async () => {
    if (!authEmail || !authPassword) {
      setAuthError('Veuillez remplir tous les champs');
      return;
    }

    setAuthError('');

    try {
      const response = await fetch(`${USER_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authEmail,
          password: authPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        setShowLogin(true);
        setAuthEmail('');
        setAuthPassword('');
      } else {
        setAuthError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setAuthError('Erreur de connexion au serveur');
      console.error('Erreur:', error);
    }
  };

  // Fonction de connexion
  const handleLogin = async () => {
    if (!authEmail || !authPassword) {
      setAuthError('Veuillez remplir tous les champs');
      return;
    }

    setAuthError('');

    try {
      const response = await fetch(`${USER_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authEmail,
          password: authPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        const user = { email: authEmail };
        setCurrentUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        setAuthEmail('');
        setAuthPassword('');
      } else {
        setAuthError(data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      setAuthError('Erreur de connexion au serveur');
      console.error('Erreur:', error);
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setTasks([]);
  };

  // Fonction pour créer une tâche
  const handleCreateTask = async () => {
    if (!taskTitle) {
      alert('Le titre est requis');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          deadline: taskDeadline
        })
      });

      if (response.ok) {
        setTaskTitle('');
        setTaskDescription('');
        setTaskDeadline('');
        setShowCreateForm(false);
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  // Fonction pour modifier une tâche
  const handleUpdateTask = async () => {
    if (!taskTitle) {
      alert('Le titre est requis');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          deadline: taskDeadline,
          status: editingTask.status
        })
      });

      if (response.ok) {
        setTaskTitle('');
        setTaskDescription('');
        setTaskDeadline('');
        setEditingTask(null);
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  // Fonction pour commencer l'édition
  const startEdit = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setTaskDeadline(task.deadline || '');
  };

  // Fonction pour changer le statut
  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';

    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus
        })
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };

  // Gérer la touche Entrée
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Si pas connecté, afficher le formulaire d'authentification
  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">📝 TalebTime</h1>

          <div className="auth-tabs">
            <button
              onClick={() => {
                setShowLogin(true);
                setAuthError('');
              }}
              className={`auth-tab ${showLogin ? 'active' : ''}`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setShowLogin(false);
                setAuthError('');
              }}
              className={`auth-tab ${!showLogin ? 'active' : ''}`}
            >
              Inscription
            </button>
          </div>

          <div className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, showLogin ? handleLogin : handleRegister)}
                placeholder="exemple@email.com"
              />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, showLogin ? handleLogin : handleRegister)}
                placeholder="••••••••"
              />
            </div>

            {authError && (
              <div className="error-message">
                {authError}
              </div>
            )}

            <button
              onClick={showLogin ? handleLogin : handleRegister}
              className="btn-primary"
            >
              {showLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </div>

          <p className="footer-text">
            Planifie aujourd’hui, réussis demain
          </p>
        </div>
      </div>
    );
  }

  // Interface principale (connecté)
  return (
    <div className="main-container">
      {/* En-tête */}
      <div className="header">
        <div>
          <h1>📝 Mes Tâches</h1>
          <p>Connecté en tant que: {currentUser?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Déconnexion
        </button>
      </div>

      {/* Bouton créer une tâche */}
      {!showCreateForm && !editingTask && (
        <button onClick={() => setShowCreateForm(true)} className="btn-create">
          ➕ Créer une nouvelle tâche
        </button>
      )}

      {/* Formulaire de création/modification */}
      {(showCreateForm || editingTask) && (
        <div className="task-form-card">
          <h2>{editingTask ? '✏️ Modifier la tâche' : '➕ Nouvelle tâche'}</h2>

          <div className="form-group">
            <label>Titre *</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Ex: Terminer le projet"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows="3"
              placeholder="Détails de la tâche..."
            />
          </div>

          <div className="form-group">
            <label>Date limite</label>
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button
              onClick={editingTask ? handleUpdateTask : handleCreateTask}
              className="btn-primary"
            >
              {editingTask ? 'Enregistrer' : 'Créer'}
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingTask(null);
                setTaskTitle('');
                setTaskDescription('');
                setTaskDeadline('');
              }}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste des tâches */}
      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📋</p>
            <p>Aucune tâche pour le moment</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`task-card ${task.status === 'completed' ? 'completed' : 'pending'}`}
            >
              <div className="task-content">
                <div className="task-info">
                  <h3 className={task.status === 'completed' ? 'task-title-completed' : ''}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <div className="task-meta">
                    <span className={`task-status ${task.status}`}>
                      {task.status === 'completed' ? '✓ Terminée' : '⏳ En cours'}
                    </span>
                    {task.deadline && (
                      <span className="task-deadline">📅 {task.deadline}</span>
                    )}
                  </div>
                </div>

                <div className="task-actions">
                  <button
                    onClick={() => toggleStatus(task)}
                    className={`btn-action ${task.status === 'completed' ? 'btn-undo' : 'btn-complete'}`}
                    title={task.status === 'completed' ? 'Marquer comme en cours' : 'Marquer comme terminée'}
                  >
                    {task.status === 'completed' ? '↩️' : '✓'}
                  </button>
                  <button
                    onClick={() => startEdit(task)}
                    className="btn-action btn-edit"
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn-action btn-delete"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pied de page */}
      <p className="footer-main">
        Planifie aujourd’hui, réussis demain
      </p>
    </div>
  );
}

export default App;