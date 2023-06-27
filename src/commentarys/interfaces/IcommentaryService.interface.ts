import { CreateCommentaryDTO } from '../dto/create-commentarys.dto';
import { UpdateCommentaryDTO } from '../dto/update-commentarys.dto';

export interface ICommentaryService {
  getAllCommentarysForPost(idPost: any);
  getOneCommentaryForPost(idPost: any, idComment: string);
  createCommentary(idPost: string, body: CreateCommentaryDTO);
  updateCommentary(idComment: string, body: UpdateCommentaryDTO);
  deleteCommentary(idComment: string);
}
