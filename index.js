const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { stdout, stderr } = require('process');
const exec = require('child_process').exec;

const config = getConfig();

function getConfig(){
    try{
        var file = fs.readFileSync('config.json', {encoding: 'utf-8'}); 
    }catch(err){
        console.log("ERROR: Configuration file not found"); 
        process.exit(0); 
    }

    try{
        var config = JSON.parse(file); 
    }catch(err){
        console.log("ERROR: config file not well formatted"); 
        process.exit(0); 
    }

    if(!(config.exe_path && config.test_folder && config.output_folder && config.result_folder)){
        console.log("ERROR: config file misses parameters");
        process.exit(0); 
    }
    
    try{
        if(!fs.statSync(config.output_folder).isDirectory()){
            console.log("ERROR: output folder "+config.output_folder+ " is not a directory."); 
            process.exit()
        }
    }catch(err){
        console.log("ERROR: output folder "+config.output_folder+ " does not exist."); 
        process.exit()
    }

    try{
        if(!fs.statSync(config.result_folder).isDirectory()){
            console.log("ERROR: result folder "+config.result_folder+ " is not a directory."); 
            process.exit()
        }
    }catch(err){
        console.log("ERROR: result folder "+config.result_folder+ " does not exist."); 
        process.exit()
    }

    try{
        if(!fs.statSync(config.test_folder).isDirectory()){
            console.log("ERROR: test folder "+config.test_folder+ " is not a directory."); 
            process.exit()
        }
    }catch(err){
        console.log("ERROR: test folder "+config.test_folder+ " does not exist."); 
        process.exit()
    }

    try{
        if(!fs.statSync(config.real_output_folder).isDirectory()){
            console.log("ERROR: real output folder "+config.real_output_folder+ " is not a directory."); 
            process.exit()
        }
    }catch(err){
        console.log("ERROR: real output folder "+config.real_output_folder+ " does not exist."); 
        process.exit()
    }

    try{
        fs.accessSync(config.exe_path,fs.constants.X_OK);
    }catch(err){
        console.log("ERROR: exe path "+config.exe_path+ " does not exist or I don't have the privileges to execute it."); 
        process.exit()
    }

    return config; 
}


function getTests(directory){
    return new Promise((resolve, reject)=>{
        fs.readdir(directory, (err, files)=>{   
            var tests = []; 
            for(let i in files){
                var filepath = path.join(directory, files[i]); 
                var stat = fs.statSync(filepath); 

                if(!stat.isDirectory() && path.extname(filepath)==='.txt'){
                    tests.push(filepath); 
                }
            }

            if(tests.length===0){
                reject("ERROR: no test found in the test folder"); 
            }
            resolve(tests); 
        });
    });
}

function main(){
    getTests(config.test_folder)
    .then((files)=>{

        var data = {}

        for(let i in files){
            var output_path = path.join(config.output_folder, path.parse(files[i]).name+"_output.txt");
            var real_output_path =  path.join(config.real_output_folder, path.parse(files[i]).name+"_realoutput.txt");
            var command = config.exe_path+" < "+files[i]+" > "+ output_path; 
            execSync(command); 
            var output = fs.readFileSync(output_path); 
            var real_output = fs.readFileSync(real_output_path); 
            data[path.parse(files[i]).name] = output.equals(real_output) ? "SUCCESSFUL": "FAILED";
        }

        fs.writeFileSync(path.join(config.result_folder, "test_result.txt"), JSON.stringify(data, null, 4))
        console.log(data)
    })
    .catch((err)=>{
        console.log(err); 
        process.exit(0); 
    })
}


main(); 