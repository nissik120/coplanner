const GroupFilters = {
    DATE : 0,
    COURSE: 1,
    TYPE: 2,
    DATE_DESC : 3,
    COURSE_DESC: 4,
    TYPE_DESC: 5
}

const SortFilters = {
    DATE : 0,
    COURSE: 1,
    TYPE: 2,
    DATE_DESC : 3,
    COURSE_DESC: 4,
    TYPE_DESC: 5  
}

const OrderFilter = {
    ASCENDING: 0,
    DESCENDING: 1
}

function executeGroupByCourse(rawArray, groupByOrder){

  
    const groups = rawArray.reduce((groups, task)=>{
  
      let taskProperty = task.course;
      //console.log(taskProperty);
  
      if(!groups[taskProperty]){
        groups[taskProperty] = [];
      }
  
      groups[taskProperty].push(task);
  
      return groups;
  
    }, {});
  
    //console.log(groups);
  
    let keySorted;
  
    keySorted = Object.keys(groups).sort((a, b) =>{
      return (a.toLowerCase()).localeCompare(b.toLowerCase())
    });
  
    if(groupByOrder==OrderFilter.DESCENDING){
      keySorted = keySorted.reverse();
    }
  
    //console.log(keySorted);
    
    let result = {}
  
    for (const groupKey in keySorted) {
      let element = keySorted[groupKey];
      result[element] = groups[element];
    }
  
    //console.log(result);
  
    return result;
  
}
  
function executeGroupByType(rawArray, groupByOrder){
  
    
    const groups = rawArray.reduce((groups, task)=>{
  
      let taskProperty = task.type;
      //console.log(taskProperty);
  
      if(!groups[taskProperty]){
        groups[taskProperty] = [];
      }
  
      groups[taskProperty].push(task);
  
      return groups;
  
    }, {});
  
    //console.log(groups);
  
    let keySorted;
  
    keySorted = Object.keys(groups).sort((a, b) =>{
      return (a.toLowerCase()).localeCompare(b.toLowerCase())
    });
  
    if(groupByOrder==OrderFilter.DESCENDING){
      keySorted = keySorted.reverse();
    }
  
    //console.log(keySorted);
    
    let result = {}
  
    for (const groupKey in keySorted) {
      let element = keySorted[groupKey];
      result[element] = groups[element];
    }
  
    //console.log(result);
  
    return result;
  
}
  
function executeGroupByDate(rawArray, groupByOrder){
  
    const groupsByDate = rawArray.reduce((groupsByDate, task)=>{
      const date = task.deadline.split('T')[0];
      if(!groupsByDate[date]){
        groupsByDate[date] = [];
      }
      groupsByDate[date].push(task);
      return groupsByDate;
    }, {});
  
    let descendDateList = (a,b) => { return new Date(b) - new Date(a)};
    let ascendDateList = (a,b) => { return new Date(a) - new Date(b)};
    let keysSorted;
  
    if(groupByOrder==OrderFilter.DESCENDING){
      keysSorted = Object.keys(groupsByDate).sort((a, b) => descendDateList(a,b));
    }else{
      keysSorted = Object.keys(groupsByDate).sort((a, b) => ascendDateList(a,b));
    }
  
    let result = {};
  
    for (let index = 0; index < keysSorted.length; index++) {
      const element = keysSorted[index];
      result[element] = groupsByDate[element];
    }
  
    return result;
  
}
  
function executeSortByDate(rawArray, sortOrder){
    let sortedArray;
    if(sortOrder==OrderFilter.DESCENDING){
      
      sortedArray = rawArray.sort((a, b)=>{
        return new Date(b.deadline) - new Date(a.deadline);
      });
  
    }else{
      
      sortedArray = rawArray.sort((a, b)=>{
        return new Date(a.deadline) - new Date(b.deadline);
      });
  
    }
  
    return sortedArray;
  
}
  
function executeSortByCourse(rawArray, sortOrder){
  
    let sortedArray;
  
    if(sortOrder==OrderFilter.DESCENDING){
      sortedArray = rawArray.sort((a,b)=>{
        return (b.course.toLowerCase()).localeCompare(a.course.toLowerCase());
      });
    }else{
      sortedArray = rawArray.sort((a,b)=>{
        return (a.course.toLowerCase()).localeCompare(b.course.toLowerCase());
      });
    }
  
    return sortedArray;
  
}
  
function executeSortByType(rawArray, sortOrder){
    let sortedArray;
  
    if(sortOrder==OrderFilter.DESCENDING){
      sortedArray = rawArray.sort((a,b)=>{
        return (b.type.toLowerCase()).localeCompare(a.type.toLowerCase());
      });
    }else{
      sortedArray = rawArray.sort((a,b)=>{
        return (a.type.toLowerCase()).localeCompare(b.type.toLowerCase());
      });
    }
  
    return sortedArray;
}

function groupArray(ungroupedArray, groupById){

    let groupedArray;
  
    switch (groupById){
      case GroupFilters.COURSE:
        {
          groupedArray = executeGroupByCourse(ungroupedArray, OrderFilter.ASCENDING);
        }
        break;
      case GroupFilters.TYPE:
        {
          groupedArray = executeGroupByType(ungroupedArray, OrderFilter.ASCENDING);
        }
        break;
        case GroupFilters.DATE_DESC:
          {
            groupedArray = executeGroupByDate(ungroupedArray, OrderFilter.DESCENDING);
          }
          break;
        case GroupFilters.COURSE_DESC:
          {
            groupedArray = executeGroupByCourse(ungroupedArray, OrderFilter.DESCENDING);
          }
          break;
        case GroupFilters.TYPE_DESC:
          {
            groupedArray = executeGroupByType(ungroupedArray, OrderFilter.DESCENDING);
          }
          break;
        case GroupFilters.DATE:
        default:
          groupedArray = executeGroupByDate(ungroupedArray, OrderFilter.ASCENDING);
        break;
    }
  
    return groupedArray;
  
}
  
function sortArray(unsortedArray, sortById){
  
    let sortedGroups;
  
    switch (sortById) {
      case SortFilters.COURSE:
        sortedGroups = executeSortByCourse(unsortedArray, OrderFilter.ASCENDING);
        break;
      case SortFilters.TYPE:
        sortedGroups = executeSortByType(unsortedArray, OrderFilter.ASCENDING);
        break;
      case SortFilters.DATE_DESC:
        {
          sortedGroups = executeSortByDate(unsortedArray, OrderFilter.DESCENDING);
        }
        break;
      case SortFilters.COURSE_DESC:
        {
          sortedGroups = executeSortByCourse(unsortedArray, OrderFilter.DESCENDING);
        }
        break;
      case SortFilters.TYPE_DESC:
        {
          sortedGroups = executeSortByType(unsortedArray, OrderFilter.DESCENDING);
        }
        break;      
      case SortFilters.DATE:
      default:
        sortedGroups = executeSortByDate(unsortedArray, OrderFilter.ASCENDING);
        break;
    }
    return sortedGroups;
  
}

export function executeGroupSortData(rawData, groupFilterID, sortFilterID) {
  
    let groupedTasksObject = groupArray(rawData, groupFilterID);
    
    for (const groupKey in groupedTasksObject) {
        let unsortedTasks = groupedTasksObject[groupKey];
        let sortedTasks = sortArray(unsortedTasks, sortFilterID);
        groupedTasksObject[groupKey] = sortedTasks;
    }
  
    return groupedTasksObject;
}

export default {executeGroupSortData};