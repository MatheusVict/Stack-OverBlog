export interface PostsInterface {
  id?: string;
  slug: string;
  content: string;
  idUser: string;
  idComentarys?: string[];
  likes?: any[];
}
