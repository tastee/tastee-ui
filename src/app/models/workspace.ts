import { File } from "app/models/file";

export class Workspace {
    public workspacePath: string;
    public selectedFileInTree: File;
    public displayedFile: File;
    public openedFiles: Array<File> = [];
    public indexFileToDisplayed: number;
    public treeDisplayed: any;
}
