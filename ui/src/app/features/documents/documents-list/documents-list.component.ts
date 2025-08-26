import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { Document, Folder } from '@core/types';
import { FolderComponent } from './folder/folder.component';
import { DocumentComponent } from './document/document.component';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  imports: [NgClass, FolderComponent, DocumentComponent],
})
export default class DocumentsListComponent {
  folders = signal<Folder[]>([
    {
      id: 'folder_1',
      name: 'Folder 1',
    },
    {
      id: 'folder_2',
      name: 'Folder 2',
    },
  ]);

  documents = signal<Document[]>([
    {
      id: 'doc_1',
      name: 'Document 1',
    },
    {
      id: 'doc_2',
      name: 'Document 2',
    },
  ]);
}
