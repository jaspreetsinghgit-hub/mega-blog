import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite"

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            });

            if (userAccount) {
                return this.login({ email, password })
            } else { return userAccount; }
        }
        catch (err) {
            throw err; console.log(err);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password });
        }
        catch (err) { throw err; }
    }

    async getCurrentUser() {
        try {
            const userData = await this.account.get();

            if (userData) return userData;
            else return null;
            
        } catch (err) {
            console.log("Error in Get user authentication", err);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (err) {
            console.log(err)
        }
    }
}

const authService = new AuthService();
export default authService;
