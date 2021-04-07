var tag = document.createElement("script");
tag.src = "./JS/data.js";
document.getElementsByTagName("head")[0].appendChild(tag);    
var uploadedFile;
var PossibleExtensions=[];
var PossibleTypes=[];

    


function getFile(files) {
    console.time('FileOpen')
    var Landing=document.querySelector('.Landing');
    var workspace=document.querySelector('.Workspace')
    
    Landing.style.display="none"
    workspace.style.display="inherit";
    const file =files[0]

    const filereader = new FileReader()
    var outputFileName=document.querySelector('#FileName')
    filereader.onloadend = function(evt) {
        if (evt.target.readyState === FileReader.DONE) {
            const uint = new Uint8Array(evt.target.result)
            let bytes = []
            uint.forEach((byte) => {
                bytes.push(byte.toString(16))
            })
            const hex = bytes.join('').toUpperCase()
            
            uploadedFile={
                filename: file.name,
                filetype: file.type ? file.type : 'Unknown/Extension missing',
                binaryFileType: getMimetype(hex),
                hex: hex
            }
            Detect_Actual_FileType()
            // console.log(uploadedFile)
            
            
        }
        outputFileName.innerText=uploadedFile.filename;
        console.timeEnd('FileOpen')
    }


    const blob = file.slice(0,32);
    filereader.readAsArrayBuffer(blob);
}


const getMimetype = (signature) => {

    SignatureData=Object.entries(SignatureData)

    for(let j=0;j<SignatureData.length;++j)
    {
        let data=SignatureData[j];
        var CurrentSignatures=data[1].signs
        for(let i=0;i<CurrentSignatures.length;++i)
        {
            let signTemp=CurrentSignatures[i].split(',');
            let offset=parseInt(signTemp[0]);
            let SignatureData=signTemp[1];
            let RequiredSignature={
                "0":signature.slice(offset,signature.length),
                "1":signature.slice(offset+1,signature.length)
            };
            if(RequiredSignature["0"].startsWith(SignatureData)||RequiredSignature["1"].startsWith(SignatureData))
            {
                PossibleExtensions.push(data)
                PossibleTypes.push(data[1].mime)
            }
        }
        
    }
    
    
  
}


var Detect_Actual_FileType=()=>{
    var nameSlpit=uploadedFile.filename.split('.');
    var extension=nameSlpit[nameSlpit.length-1].toLowerCase();
    var outputFileextensionAfter=document.querySelector('#FileExtAfter')
    var extnsnText=document.querySelector('#extensionText')
    var mimeText=document.querySelector('#mimeText')

    var outputFileType=document.querySelector('#FileType')
    let extensionString=null;
    let mimeString=null;
    var flag=false;
    PossibleExtensions.map(data=>{
        if(data[0]==extension)
        {
            outputFileextensionAfter.innerText=extension;
            outputFileType.innerText=data[1].mime;
            flag=true
            return
        }
        extensionString+=data[0]+" , ";
        mimeString+=data[1].mime+" , ";
    
    })
    if(!flag)
    {
        
            outputFileextensionAfter.innerText="Possible extensions are "+extensionString.slice(0,extensionString.length-1);
            outputFileType.innerText="Possible types are "+mimeString.slice(0,mimeString.length-1);
    }
    extnsnText.innerText=extensionString?"More possible extensions are "+extensionString.slice(0,extensionString.length-2):"no more possible extensions";
    mimeText.innerText=mimeString?"More possible mime types are "+mimeString.slice(0,mimeString.length-2):"no more possible mime types";

}   
