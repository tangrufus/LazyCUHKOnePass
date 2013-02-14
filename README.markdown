#LazyCUHK
Automatic login to CUHK services including ResNet, WiFi, library, MyCUHK, ERGWAVE,etc. (unofficial)

##Anouncement
LazyCUHK is no longer available in Chrom Web Store in respond to a request from CUHK ITSC.  You can get it via its GitHub [repo](https://github.com/TangRufus/LazyCUHK) page.

##Installation
1. Download the source code from GitHub [Tags](https://github.com/TangRufus/LazyCUHK/tags) page [^1]
2. Unzip the the source code
3. Go to "chrome://extensions" (type it in the address bar)
4. Check `Developer mode`
5. Click `Load unpacked extension…`
6. Select the unzipped folder

[^1] OR, clone it by

		git clone https://github.com/<yourName>/LazyCUHK.git
		
##Troubleshoot
> How to open option page?

Go to "chrome://extensions" (type it in the address bar)   
Click "option" under LazyCUHK
![firstTimeSetUp](https://raw.github.com/TangRufus/LazyCUHK/master/images/firstTimeSetUp.png)

##Bug Report or Suggestion
* Send an E-mail to <room0214@gmail.com>
* Make a new [GitHub Issue](https://github.com/TangRufus/LazyCUHK/issues)

##Contribution
So you hate the cumbrous login processes. Great!
Several kinds of contributions are welcomed.

* [Tweet](https://twitter.com/intent/tweet?original_referer=&source=tweetbutton&text=LazyCUHK!%20%20Don%E2%80%99t%20type%20passwords%20anymore!%20%20Just%20be%20lazy!%20%20%20&url=http%3A%2F%2Fbit.ly%2F12OABwe) LazyCUHK
* [Like](http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fgithub.com%2FTangRufus%2FLazyCUHK&send=false&layout=standard&width=270&show_faces=false&action=like&colorscheme=light&font&height=35) LazyCUHK via the button on options page
* Money donation via option page PayPal button
* Star the [LazyCUHK Github repo](https://github.com/TangRufus/LazyCUHK)
* Implement a new feature, see [Workflow](#workflow)

##Workflow
Here’s the most direct way to get your work merged into the project:

***Keep this in mind: The `master` branch is for deployment only.  Branch off from the `develop` branch to start your awesome work.  Fetch and rebase the `upstream/develop` branch before pull request. ***


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
		git merge develop
   If necessary, rebase your commits into logical chunks, without bugs
8. Push the branch up to your own copy of fork

		git push origin my_awesome_feature

9. Create an [Pull Request](https://github.com/TangRufus/LazyCUHK/pull/new/master) with a description and link to your `my_awesome_feature`branch
10. You have done so much.  Leave the hard work to me.  Enjoy being lazy.  

##Finally...
Thanks! 