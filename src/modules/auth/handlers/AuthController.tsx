
import { SessionStrapiManager } from "@functions/session-strapi";

export class AuthController {
    private Astro: any;
    private session: SessionStrapiManager;

    constructor(Astro){
        this.Astro = Astro;
        this.session = Astro.locals.session;
    }

    async login(){
        const sessionData = this.session.getData();
        
        if (this.Astro.request.method !== "POST") {
            return sessionData;
        }
        
        const data = await this.Astro.request.formData();
        const identifier = data.get("identifier");
        const password = data.get("password");
        
        try {
         
        const resp = await fetch(`http://localhost:1337/api/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
                body: JSON.stringify({
                    identifier,
                    password
                    })
                })
        
        const user= await resp.json();
        console.log({user})
        sessionData.user = user;

        } catch (error) {
            console.log(error);
        }

        this.session.save(sessionData);

        return sessionData;
    }
    

    getUser(){
        const sessionData = this.session.getData();
        return sessionData.user;
    }


    async logout(){
        const sessionData = this.session.getData();
        sessionData.user = null;

        this.session.save(sessionData);
    }
}