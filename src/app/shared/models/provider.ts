export class Provider {
    name:string;
    file: File;
    correspondence: [];

    constructor(theName :string = '', theFile: File = null, theCorrespondence: [] = null){
        this.name = theName;
        this.file = theFile;
        this.correspondence = theCorrespondence;
    }
}
