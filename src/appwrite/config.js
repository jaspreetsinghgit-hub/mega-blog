import { Client, ID, Query, TablesDB, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // TableDS work
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: { title, content, featuredImage, status, userId }
            })
        } catch (err) {
            console.log("Error in Create Post: ", err);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            })
        } catch (err) {
            console.log("Error in Update Post: ", err);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
            return true;
        } catch (err) {
            console.log("Error in Delete Post: ", err);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        } catch (err) {
            console.log("Error in Get Post: ", err);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries
            })
        } catch (err) {
            console.log("Error in getting list of all post : ", err);
            return false;
        }
    }

    // File Upload Services (Storage Work)
    async uploadFile(file) { // for image
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (err) {
            console.log("Error in Upload File : ", err);
            return false;
        }
    }

    async deleteFile(fileId) { // file image
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })

            return true;
        } catch (err) {
            console.log("Error in Delete File : ", err);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        })
    }
}


const service = new Service();
export default service;
