export class Provider {
    name:string;
    file: File;
    correspondence: Array<Int32Array>;
    toExport: boolean;

    constructor(theName :string = '', theFile: File = null, theCorrespondence: Array<Int32Array> = null, theToExport: boolean = true){
        this.name = theName;
        this.file = theFile;
        this.correspondence = theCorrespondence;
        this.toExport = theToExport;
    }
}
