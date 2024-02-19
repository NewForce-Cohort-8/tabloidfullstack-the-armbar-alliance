using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
       void Add(Category category);
       void Update(Category category);
       Category GetById(int id);
    }
}