import { CreatePostsDTO } from '../dto/create-posts.dto';
import { UpdatePostsDTO } from '../dto/update-posts.dto';
import { Posts } from '../schemas/posts.schema';

export interface IPostsService {
  createPost(data: CreatePostsDTO, userID: string): Promise<Posts>;
  getAllPosts();
  getOneForId(id: string);
  getOneForSlug(slug: any);
  updatePost(_id: string, data: UpdatePostsDTO);
  deletePost(_id: string);
}
