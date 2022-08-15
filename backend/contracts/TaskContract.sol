// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {

  //modifiers
  modifier notDeleted ( uint _taskId) {
    if(tasks[_taskId].deleted == false) _;
  }

  //events
  event TaskCreated(uint _id);
  event TaskDeleted(uint _id);
  event TaskUpdated(uint _id);

  //constructors
  // constructor() public {
  // }

  //variables and definitions
  struct Task {
    string name;
    string description;
    bool completed;
    bool deleted;
    bool starred;
    bool important;
    uint created_at;
  }
  mapping(uint => address) public taskToOwner;
  mapping(address => uint) public ownerToTaskCount;

  Task[] tasks;

  //functions
  function addTask(string memory _name, string memory _description) external {
    tasks.push(Task(
      _name,
      _description,
      false,
      false,
      false,
      false,
      block.timestamp
    ));
    uint id = tasks.length - 1;
    taskToOwner[id] = msg.sender;
    ownerToTaskCount[msg.sender]++;
    emit TaskCreated(id);

  }

  function getTask(uint id) external view notDeleted(id)  returns ( Task  memory tsk)  {
    return tasks[id];
  }

  function getTasksStatusCount () public view returns (uint completed, uint incomplete, uint deleted, uint important, uint unimportant, uint starred, uint unstarred) {
    uint complete_count = 0;
    uint incomplete_count = 0;
    uint deleted_count = 0;
    uint starred_count = 0;
    uint unstarred_count = 0;
    uint important_count = 0;
    uint unimportant_count = 0;
    for(uint i = 0; i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
          if(tasks[i].completed == true && tasks[i].deleted == false){
            complete_count++;
          } else if(tasks[i].completed == false && tasks[i].deleted == false) {
            incomplete_count++;
          }else if(tasks[i].deleted == true){
            deleted_count++;
          }else if(tasks[i].important == true && tasks[i].deleted == false){
            important_count++;
          }else if(tasks[i].important == false && tasks[i].deleted == false){
            unimportant_count++;
          }else if(tasks[i].starred == true && tasks[i].deleted == false){
            starred_count++;
          }else if(tasks[i].starred == false && tasks[i].deleted == false){
            unstarred_count++;
          }
          
        }
      }

      return (complete_count, incomplete_count, deleted_count, important_count, unimportant_count, starred_count, unstarred_count);
    }

  function getTasks() external view returns (Task[] memory) {
    Task[] memory _tasks = new Task[](ownerToTaskCount[msg.sender]);
    uint count = 0;
    for(uint i = 0; i < tasks.length; i++){
      if(tasks[i].deleted == false && taskToOwner[i] == msg.sender){
        _tasks[count] = tasks[i];
        count++;
      }
    }
    return _tasks;
  }

  function getTasksCompletedByUser() external view returns (Task[] memory){
    uint completed;
    (completed, , ,,,,) = getTasksStatusCount();
    uint count;

    Task[] memory _tasks = new Task[](completed);

    for(uint i = 0; i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
        if(tasks[i].completed == true && tasks[i].deleted == false){
          _tasks[count] = tasks[i];
        }
      }
      
    }

    return _tasks;

  }

  function getTasksNotCompletedByUser() external view returns (Task[] memory){
    uint incomplete;
    (, incomplete, ,,,,) = getTasksStatusCount();
    uint count;

    Task[] memory _tasks = new Task[](incomplete);

    for (uint i = 0 ;  i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
        if(tasks[i].completed == false && tasks[i].deleted == false){
          _tasks[count] = tasks[i];
        }
      }
    }
    return _tasks;
  }

  function getStarredTasks() external view returns (Task[] memory) {
    uint starred;
    (, , , , , starred,) = getTasksStatusCount();
    uint count;
    Task[] memory _tasks = new Task[](starred);
    for(uint i = 0; i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
        if(tasks[i].starred == true && tasks[i].deleted == false){
          _tasks[count] = tasks[i];
          count++;
        }
      }
    }
    return _tasks;
  }


  function getUnstarredTasks() external view returns (Task[] memory) {
    uint unstarred;
    (, , , , , , unstarred) = getTasksStatusCount();
    uint count;
    Task[] memory _tasks = new Task[](unstarred);
    for(uint i = 0; i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
        if(tasks[i].starred == false && tasks[i].deleted == false){
          _tasks[count] = tasks[i];
          count++;
        }
      }
    }
    return _tasks;
  }
  function getImportantTasks() external view returns (Task[] memory) {
    uint important;
    (, , , important, ,,) = getTasksStatusCount();
    uint count;
    Task[] memory _tasks = new Task[](important);
    for(uint i = 0; i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
        if(tasks[i].important == true && tasks[i].deleted == false){
          _tasks[count] = tasks[i];
          count++;
        }
      }
    }
    return _tasks;
  }

  function getUnimportantTasks() external view returns (Task[] memory) {
    uint unimportant;
    (, , , , unimportant,,) = getTasksStatusCount();
    uint count;
    Task[] memory _tasks = new Task[](unimportant);
    for(uint i = 0; i < tasks.length; i++){
      if(msg.sender == taskToOwner[i]){
        if(tasks[i].important == false && tasks[i].deleted == false){
          _tasks[count] = tasks[i];
          count++;
        }
      }
    }
    return _tasks;
  }

  

  function deleteTask( uint id ) external notDeleted(id) {
    tasks[id].deleted = true;
    ownerToTaskCount[msg.sender]--;
    emit TaskDeleted(id);
  }

  function toggleStarred (uint id) external notDeleted(id) {
    tasks[id].starred = !tasks[id].starred;
    emit TaskUpdated(id);
  }

  function toggleImportant (uint id) external notDeleted(id) {
    tasks[id].important = !tasks[id].important;
    emit TaskUpdated(id);
  }

  function toggleCompleted (uint id) external notDeleted(id) {
    tasks[id].completed = !tasks[id].completed;
    emit TaskUpdated(id);
  }

}
