using TabloidFullStack.Models;
using Microsoft.Extensions.Hosting;

namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        List<Tags> GetAll();
    }
}