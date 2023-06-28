import { CreatePostsDTO } from '../dto/create-posts.dto';
import { UpdatePostsDTO } from '../dto/update-posts.dto';

export interface IPostsService {
  createPost(data: CreatePostsDTO): Promise<void>;
  getAllPosts();
  getOneForId(id: string);
  getOneForSlug(slug: any);
  updatePost(_id: string, data: UpdatePostsDTO);
  deletePost(_id: string);
}
