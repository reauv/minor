# Pros & cons for using a single page web app

## Pros
#### Dynamic & fast
Not waiting for slow page refresh, this is really important for applications like Gmail.
#### More responsive experience (eg. inline editting)
Instead of going to an edit page you can just edit something inline.
#### Smarter, better experience
For example search suggestions while you are typing.
#### Save application state
Application state can be saved on the client side, for example when you are writing a blog post.
#### Works 'everywhere'
In comparison to a native app it works everywhere and only requires one code base. So for mobile it's cheaper to make a SPA than native iOS/Android apps.

## Cons 
#### SEO
When everything is Javascript a crawler sees nothing. (Used to be, isomorphic is piece of cake now)
#### Overkill for a really simple websites.
For static websites it's just overkill and only causes more problems than it solves.
#### Progressive enhancement
it's a lot of work to build a SPA that works for browser without/disabled Javascript.
#### More states to think about
For example: error messages, loading indicators
#### Security
Security is a lot harder for SPA because you cant't trust anyting on the client side.

### Sources
* http://stackoverflow.com/questions/21862054/single-page-application-advantages-and-disadvantages
* http://tilomitra.com/web-vs-native/
* Own experience

