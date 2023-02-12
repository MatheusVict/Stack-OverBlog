export interface PostsInterface {
  id?: string;
  title: string;
  slug: string;
  content: string;
  idUser: string;
  idComentarys?: string[];
  likes?: any[];
}
