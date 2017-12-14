import { File } from 'app/models/file';

export class Workspace {
    public workspacePath: string;
    public selectedFileInTree: File;
    public displayedFile: File;
    public openedFiles: Array<File> = [];
    public treeDisplayed: any;
    public menu: string;
    public openedFolders: Array<File> = [];

    static copy(wsToCopy: Workspace): Workspace {
        const workspace = new Workspace();
        workspace.workspacePath = wsToCopy.workspacePath;
        workspace.selectedFileInTree = wsToCopy.selectedFileInTree;
        workspace.displayedFile = wsToCopy.displayedFile;
        workspace.openedFiles = wsToCopy.openedFiles;
        workspace.treeDisplayed = wsToCopy.treeDisplayed;
        workspace.menu = wsToCopy.menu;
        workspace.openedFolders = wsToCopy.openedFolders;
        return workspace;
    }
}
