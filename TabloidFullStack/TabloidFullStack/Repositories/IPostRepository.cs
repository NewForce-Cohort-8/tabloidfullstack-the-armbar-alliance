using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        
        List<Post> GetAll();
        Post GetPostById(int id);
        void Delete(int id);
    }
}