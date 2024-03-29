﻿using TabloidFullStack.Models;
using TabloidFullStack.Repositories;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config) { }
        public List<Tags> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT id, name FROM Tag ORDER BY name";
                    var reader = cmd.ExecuteReader();

                    List<Tags> tags = new List<Tags>();

                    while (reader.Read())
                    {
                        tags.Add(new Tags()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return tags;
                }
            }
        }
        public Tags GetById(int TagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT id, name FROM Tag WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", TagId);
                    var reader = cmd.ExecuteReader();

                    Tags tags = null;

                    while (reader.Read())
                    {
                        if (tags == null)
                        {
                            tags = new Tags
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                            };
                        }
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public void Add(Tags tags)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tag (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", tags.Name);

                    tags.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}