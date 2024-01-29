
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
        

        if (identifier === "admin" && password === "admin") {
            sessionData.userId = "admin";
        } else {
            sessionData.userId = null;
        }

        this.session.save(sessionData);

        return sessionData;
    }
    

    getUserId(){
        const sessionData = this.session.getData();
        return sessionData.userId;
    }


    async logout(){
        const sessionData = this.session.getData();
        sessionData.userId = null;

        this.session.save(sessionData);
    }
}