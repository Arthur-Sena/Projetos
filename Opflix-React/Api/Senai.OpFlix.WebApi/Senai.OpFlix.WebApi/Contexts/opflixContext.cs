using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class opflixContext : DbContext
    {
        public opflixContext()
        {
        }

        public opflixContext(DbContextOptions<opflixContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Genero> Genero { get; set; }
        public virtual DbSet<Lancamento> Lancamento { get; set; }
        public virtual DbSet<Plataforma> Plataforma { get; set; }
        public virtual DbSet<Tipo> Tipo { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        // Unable to generate entity type for table 'dbo.Favorito'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=T_Opflix;User Id=sa;Pwd=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.IdGenero);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Lancamento>(entity =>
            {
                entity.HasKey(e => e.IdLancamentos);

                entity.Property(e => e.ClassificacaoIndicativa)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DataLancamento).HasColumnType("datetime");

                entity.Property(e => e.Duracao)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdGenero).HasColumnName("Id_Genero");

                entity.Property(e => e.IdTipo).HasColumnName("Id_Tipo");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Sinopse)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdGeneroNavigation)
                    .WithMany(p => p.Lancamento)
                    .HasForeignKey(d => d.IdGenero)
                    .HasConstraintName("FK__Lancament__Id_Ge__08B54D69");

                entity.HasOne(d => d.IdPlataformaNavigation)
                    .WithMany(p => p.Lancamento)
                    .HasForeignKey(d => d.IdPlataforma)
                    .HasConstraintName("FK__Lancament__IdPla__06CD04F7");

                entity.HasOne(d => d.IdTipoNavigation)
                    .WithMany(p => p.Lancamento)
                    .HasForeignKey(d => d.IdTipo)
                    .HasConstraintName("FK__Lancament__Id_Ti__07C12930");
            });

            modelBuilder.Entity<Plataforma>(entity =>
            {
                entity.HasKey(e => e.IdPlataforma);

                entity.HasIndex(e => e.Plataforma1)
                    .HasName("UQ__Platafor__3FCED0922F0F87FD")
                    .IsUnique();

                entity.Property(e => e.Plataforma1)
                    .IsRequired()
                    .HasColumnName("Plataforma")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Tipo>(entity =>
            {
                entity.HasKey(e => e.IdTipo);

                entity.HasIndex(e => e.Tipo1)
                    .HasName("UQ__Tipo__8E762CB4A961D1D8")
                    .IsUnique();

                entity.Property(e => e.Tipo1)
                    .IsRequired()
                    .HasColumnName("Tipo")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario);

                entity.HasIndex(e => e.Tipo)
                    .HasName("UQ__TipoUsua__8E762CB4591DDC54")
                    .IsUnique();

                entity.Property(e => e.IdTipoUsuario).HasColumnName("Id_TipoUsuario");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Usuario__A9D1053447E3ED85")
                    .IsUnique();

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdTipoUsuario).HasColumnName("Id_TipoUsuario");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__Usuario__Id_Tipo__5812160E");
            });
        }
    }
}
