// // we use [...nextAuth] to catch all unknown routes thatt are sent to api/auth/jgjkn
import NextAuth from 'next-auth';
// import the credentials provider 
import CredentialsProvider from 'next-auth/providers/credentials'

// the next auth returns a functionn , so we have to export that function

export default NextAuth({
    providers: [
        CredentialsProvider({
            // indicate the type of provider you are using 
            name: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // credentials: {
            //     username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     password: { label: "Password", type: "password" }
            // },

            //   authorize the user credentials
            // the authorize method takes two arguements . the credentials object and the req method
            async authorize(credentials, req) {
                try {
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the `req` object to obtain additional parameters
                    // (i.e., the request IP address)
                    // 
                    // our endpoint is on 30001, because :3000 is busy
                    // so when you want to use this confirm the :(port) your server is running on and chnage the port number 
                    // you are making a post request to
                    const res = await fetch("http://localhost:3001/api/login", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })

                    // in authorize function, if we return an object then we  let next js know that the authorization was successful
                    const user = await res.json()
                    if (res.status === 200 && user) {
                        return user
                    }
                    else {
                        // if we return null next-auth takes it that our authorization failed and will redirect to an error page
                        // to prevent this , we wll prevent the redirect in our frontend(loginform)
                        return null

                    }
                }
                catch (error) {
                    console.log(error)
                }

            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
    },
    pages: {
        signIn: "../../login"
    }

})