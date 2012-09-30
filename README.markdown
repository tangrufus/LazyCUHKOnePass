#LazyCUHK
Automatic login to CUHK services including ResNet, WiFi, library, MyCUHK, ERGWAVE,etc. (unofficial)

##Installation
1. Go to [Chrome Web Store - LazyCUHK](https://chrome.google.com/webstore/detail/hhholmpehbnebpfklecipmcpkelnnabe)
2. Click `ADD TO CHROME` button on the top-right hand corner
3. Option page should automatically pops up 
4. Enter your account information in the option page

##Troubleshoot
> How to open option page?

Go to "chrome://extensions" (type it in the address bar).    
Click "option" under LazyCUHK.   
![firstTimeSetUp](https://raw.github.com/TangRufus/LazyCUHK/master/images/firstTimeSetUp.png)

##Bug Report or Suggestion
* Send an E-mail to <room0214@gmail.com>
* Make a new [GitHub Issue](https://github.com/TangRufus/LazyCUHK/issues)

##Contribution
So you hate the cumbrous login processes. Great!
Several kinds of contributions are accepted.

* Give a 5-star review in [chrome web store](https://chrome.google.com/webstore/detail/hhholmpehbnebpfklecipmcpkelnnabe/reviews)
* Money donation via option page PayPal button
* Star the [LazyCUHK Github repo](https://github.com/TangRufus/LazyCUHK)
* Implement a new feature, see [Workflow](#workflow)

##Workflow
Here’s the most direct way to get your work merged into the project:

**Keep this in mind: The `master` branch is for deployment only.  Branch off from the `develop` branch to start your awesome work.  Fetch and rebase the `upstream/develop` branch before pull request. **


1. Fork the project
2. Clone your fork

		git clone https://github.com/<yourName>/LazyCUHK.git
3. Configure remote

		git remote add upstream https://github.com/TangRufus/LazyCUHK.git
		git branch develop upstream/develop
4. Create a descriptively named branch, branch off from the develop branch, to contain your change 

		git checkout -b my_awesome_feature develop
5. Hack away
6. Stay updated

		git fetch upstream
		git checkout develop
		git merge upstream/develop
		git push origin develop
7. Rebase

		git checkout my_awesome_feature
		git git merge develop
   If necessary, rebase your commits into logical chunks, without bugs
8. Push the branch up to your own copy of fork

		git push origin my_awesome_feature

9. Create an Pull Request with a description and link to your `my_awesome_feature`branch
10. You have done so much.  Leave the hard work to me.  Enjoy being lazy.  

##Finally...
Thanks! 