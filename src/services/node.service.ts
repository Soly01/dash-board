import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  private fileSystemData: TreeNode[] = [
    {
      data: {
        name: 'Ahmed Shop',
        finish: '10 May 2022',
        client: 'Ahmed Company',
        price: '1500',
        team: '5',
        status: 'Pending',
      },
    },
    {
      data: {
        name: 'Ministry ',
        finish: '12 Oct 2023        ',
        client: 'Ministry',
        price: '5300',
        team: '3',
        status: 'in Progress',
      },
    },
    {
      data: {
        name: 'bouba app        ',
        finish: '05 sep 2021',
        client: 'bouba',
        price: '800',
        team: '2',
        status: 'Completed',
      },
    },
    {
      data: {
        name: 'Soly Website',
        finish: '25 may 2023        ',
        client: 'Soly ',
        price: '600',
        team: '2',
        status: 'Completed',
      },
    },
    {
      data: {
        name: 'fakebook',
        finish: '4 oct 2023        ',
        client: 'meta',
        price: '2600',
        team: '6',
        status: 'Rejected',
      },
    },
    {
      data: {
        name: 'hello world',
        finish: '1 jan 2022',
        client: 'mr.x',
        price: '600',
        team: '2',
        status: 'Completed',
      },
    },
  ];

  getFilesystem(): Promise<TreeNode[]> {
    // Simulate an asynchronous operation (e.g., fetching data from a server)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.fileSystemData);
      }, 1000); // Simulating a delay of 1 second (adjust as needed)
    });
  }
}
