const tasks = [];
class Task {
    constructor(id, title, descriptin, status, deadline){
        this.id = id,
        this.title = title, 
        this.description = description,
        this.status = status || 'pending',
        this.deadline =deadline
    };
}
module.exports = { Task, tasks }; 