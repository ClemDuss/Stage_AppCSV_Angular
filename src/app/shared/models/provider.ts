export class Provider {
    name:string;
    file: File;
    correspondence: Array<Int32Array>;

    constructor(theName :string = '', theFile: File = null, theCorrespondence: Array<Int32Array> = null){
        this.name = theName;
        this.file = theFile;
        this.correspondence = theCorrespondence;
    }
}
