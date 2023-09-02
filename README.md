# Tester
Made for testing C compiled files, with input text. I'm not sure but it should work also with other compiled files but never tested. 


# How to use it
This node script is a C compiled file tester. It is very simple to use, just follow this guidelines: 
* Download the repo
* Be sure to have Nodejs installed on your pc (tested on Node v18.15.0)
* Enter the project directory with your terminal
* Run the following command *npm install* to be sure every package is installed correctly
* Fill the *config.json* file in a proper way
    * **exe_path**, insert the path of your executable. It could be an *.exe* or an *.sh* file (never tested on macOs but it should work). For instace *"C:\\Users\\myUser\\Desktop\\test.exe"* on Windows. 
    * **test_folder**, insert the folder in which the txt files for testing are available. The script ignores sub-directories and other file extension. The name of the file will be the *key* associated to the test. 
    * **output_folder**, put here the directory in which the executable outputs will be stored. The output associated to the given test will have the format *key_output.txt*. 
    * **real_output_folder**, put here the directory in which the real output files have been saved. With "real" I mean the values the program should compare with the output. Save each real output file as *key_realoutput.txt*, so the program can understand which file has to be compared. 
    * **result_folder**, when the script ends it will save the results of the tests in a file called *test_result.txt*. Put here the folder path in which you want to save this file. 
* run *npm start* to see the magic

If you think about it, because of the formatting of the files *output_folder*, *real_output_folder* and *result_folder* can be the same, but *test_folder* must be different, in order to avoid catching extra txt files that are not tests. 

**Important:** 
* avoid using relative paths (just use absolute path) if you don't have the folders in the same directory of the executable
* do not use test names with spaces, fill them with somenthing. For istance *'test 1.txt'* will not work, but *'test_1.txt'* will.
* possible bug, check that the real file has a new empty line at the end of the line. The print of the test adds an EOF at the end. 

If you find some bug let me know!