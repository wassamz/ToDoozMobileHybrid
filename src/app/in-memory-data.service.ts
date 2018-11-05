import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const toDoList = [
      { id: 1, task: 'Go to the beach' },
      { id: 2, task: 'Buy groceries' },
      { id: 3, task: 'Salsa Class' },
      { id: 4, task: 'Oil Change' },
      { id: 5, task: 'Fix Door' },
      { id: 6, task: 'Buy toothpaste' },
      { id: 7, task: 'Find latest released movies' },
      { id: 8, task: 'Street Festival' },
      { id: 9, task: 'Call Mom' },
      { id: 10, task: 'Buy Anniversary Gift' }
    ];
    return { toDoList };
  }
}