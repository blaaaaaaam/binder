# binder + netlify cms
\
This fork of Clement Valla's [Binder](https://github.com/clementvalla/binder) adds support for using Netlify CMS to update the json file.
It also removes the need to jQuery and only uses vanilla js.

\
To deploy:
1. Clone the repo to your git provider
2. Deploy your cloned repo to Netlify. [Documentation](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git)
    - Note: Leave all the build settings empty
3. Enable Netlify Identity. [Documentation](https://docs.netlify.com/visitor-access/identity/)
4. Enable Netlify Git-gateway [Documentation](https://docs.netlify.com/visitor-access/git-gateway/)

\
For Binder documentation refer to the original repo.
