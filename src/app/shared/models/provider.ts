export class Provider {
    name:string;
    file: File;
    correspondence;
    toExport: boolean;

    constructor(theName :string = '', theFile: File = null, theCorrespondence = null, theToExport: boolean = true){
        this.name = theName;
        this.file = theFile;
        this.correspondence = theCorrespondence;
        this.toExport = theToExport;
    }
}
