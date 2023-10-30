<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
  
    export let article: PageData;
  </script>
  
  <div class="article" on:click={() => goto(`/p/${article.id}`)}>
    <h2>{article.title}</h2>
    <small
      >{article.author?.name ? `By ${article.author.name}` : "Unknown author"}</small
    >
    <p>{@html article.description}</p>
  </div>
  
  <style>
    div {
      color: inherit;
      padding: 2rem;
    }
    .article {
      background: white;
      transition: box-shadow 0.1s ease-in;
    }
  
    .article:hover {
      box-shadow: 1px 1px 3px #aaa;
      cursor: pointer;
    }
  
    .article,
    .article {
      margin-top: 2rem;
    }
  </style>
