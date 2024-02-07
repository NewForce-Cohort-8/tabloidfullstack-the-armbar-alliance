using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;
using TabloidFullStack.Utils;

namespace Gifter.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, 
                               p.ImageLocation AS HeaderImage,
                               p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                               p.CategoryId, p.UserProfileId,
                               c.[Name] AS CategoryName,
                               u.FirstName, u.LastName, u.DisplayName, 
                               u.Email, u.CreateDateTime AS UserCreateDateTime, 
                               u.ImageLocation AS AvatarImage,
                               u.UserTypeId, 
                               ut.[Name] AS UserTypeName
                          FROM Post p
                               LEFT JOIN Category c ON p.CategoryId = c.Id
                               LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                               LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME()
                         ORDER BY p.PublishDateTime DESC";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                ImageLocation = reader.IsDBNull(reader.GetOrdinal("HeaderImage")) ? null : reader.GetString(reader.GetOrdinal("HeaderImage")),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                CategoryName = reader.GetString(reader.GetOrdinal("CategoryName")),
                                User = new UserProfile
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("UserCreateDateTime")),
                                    ImageLocation = reader.IsDBNull(reader.GetOrdinal("AvatarImage")) ? null : reader.GetString(reader.GetOrdinal("AvatarImage")),
                                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    UserType = new UserType
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                    }
                                }
                            });
                        }
                        return posts;
                    }
                }
            }
        }
    }
}

//        public List<Post> GetAllWithComments()
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated,
//                       p.ImageUrl AS PostImageUrl, p.UserProfileId AS PostUserProfileId,

//                       up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated,
//                       up.ImageUrl AS UserProfileImageUrl,

//                       c.Id AS CommentId, c.Message, c.UserProfileId AS CommentUserProfileId
//                  FROM Post p
//                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                       LEFT JOIN Comment c on c.PostId = p.id
//              ORDER BY p.DateCreated";

//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        var postId = DbUtils.GetInt(reader, "PostId");

//                        var existingPost = posts.FirstOrDefault(p => p.Id == postId);
//                        if (existingPost == null)
//                        {
//                            existingPost = new Post()
//                            {
//                                Id = postId,
//                                Title = DbUtils.GetString(reader, "Title"),
//                                Caption = DbUtils.GetString(reader, "Caption"),
//                                DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                                ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
//                                UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId"),
//                                UserProfile = new UserProfile()
//                                {
//                                    Id = DbUtils.GetInt(reader, "PostUserProfileId"),
//                                    Name = DbUtils.GetString(reader, "Name"),
//                                    Email = DbUtils.GetString(reader, "Email"),
//                                    DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                    ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                                },
//                                Comments = new List<Comment>()
//                            };

//                            posts.Add(existingPost);
//                        }

//                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
//                        {
//                            existingPost.Comments.Add(new Comment()
//                            {
//                                Id = DbUtils.GetInt(reader, "CommentId"),
//                                Message = DbUtils.GetString(reader, "Message"),
//                                PostId = postId,
//                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId")
//                            });
//                        }
//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }
//        public Post GetById(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                          SELECT Title, Caption, DateCreated, ImageUrl, UserProfileId
//                            FROM Post
//                           WHERE Id = @Id";

//                    DbUtils.AddParameter(cmd, "@Id", id);

//                    var reader = cmd.ExecuteReader();

//                    Post post = null;
//                    if (reader.Read())
//                    {
//                        post = new Post()
//                        {
//                            Id = id,
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Caption = DbUtils.GetString(reader, "Caption"),
//                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
//                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                        };
//                    }

//                    reader.Close();

//                    return post;
//                }
//            }
//        }
//        public List<Post> Search(string criterion, bool sortDescending)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    var sql =
//                        @"SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated, 
//                        p.ImageUrl AS PostImageUrl, p.UserProfileId,

//                        up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated, 
//                        up.ImageUrl AS UserProfileImageUrl
//                    FROM Post p 
//                        LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                    WHERE p.Title LIKE @Criterion OR p.Caption LIKE @Criterion";

//                    if (sortDescending)
//                    {
//                        sql += "ORDER BY p.DateCreated DESC";
//                    }
//                    else
//                    {
//                        sql += "ORDER BY p.DateCreated";
//                    }

//                    cmd.CommandText = sql;
//                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        posts.Add(new Post()
//                        {
//                            Id = DbUtils.GetInt(reader, "PostId"),
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Caption = DbUtils.GetString(reader, "Caption"),
//                            DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                            ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                            UserProfile = new UserProfile()
//                            {
//                                Id = DbUtils.GetInt(reader, "UserProfileId"),
//                                Name = DbUtils.GetString(reader, "Name"),
//                                Email = DbUtils.GetString(reader, "Email"),
//                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                            },
//                        });
//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }

//        public List<Post> SearchHottest(DateTime since)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated, 
//                        p.ImageUrl AS PostImageUrl, p.UserProfileId,

//                        up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated, 
//                        up.ImageUrl AS UserProfileImageUrl
//                    FROM Post p 
//                        LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                    WHERE p.DateCreated >= @Since";

//                    DbUtils.AddParameter(cmd, "@Since", $"{since}");
//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        posts.Add(new Post()
//                        {
//                            Id = DbUtils.GetInt(reader, "PostId"),
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Caption = DbUtils.GetString(reader, "Caption"),
//                            DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                            ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                            UserProfile = new UserProfile()
//                            {
//                                Id = DbUtils.GetInt(reader, "UserProfileId"),
//                                Name = DbUtils.GetString(reader, "Name"),
//                                Email = DbUtils.GetString(reader, "Email"),
//                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                            },
//                        });
//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }

//        public void Add(Post post)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        INSERT INTO Post (Title, Caption, DateCreated, ImageUrl, UserProfileId)
//                        OUTPUT INSERTED.ID
//                        VALUES (@Title, @Caption, @DateCreated, @ImageUrl, @UserProfileId)";

//                    DbUtils.AddParameter(cmd, "@Title", post.Title);
//                    DbUtils.AddParameter(cmd, "@Caption", post.Caption);
//                    DbUtils.AddParameter(cmd, "@DateCreated", post.DateCreated);
//                    DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
//                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

//                    post.Id = (int)cmd.ExecuteScalar();
//                }
//            }
//        }

//        public void Update(Post post)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        UPDATE Post
//                           SET Title = @Title,
//                               Caption = @Caption,
//                               DateCreated = @DateCreated,
//                               ImageUrl = @ImageUrl,
//                               UserProfileId = @UserProfileId
//                         WHERE Id = @Id";

//                    DbUtils.AddParameter(cmd, "@Title", post.Title);
//                    DbUtils.AddParameter(cmd, "@Caption", post.Caption);
//                    DbUtils.AddParameter(cmd, "@DateCreated", post.DateCreated);
//                    DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
//                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
//                    DbUtils.AddParameter(cmd, "@Id", post.Id);

//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }

//        public void Delete(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
//                    DbUtils.AddParameter(cmd, "@id", id);
//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }
//    }
//}