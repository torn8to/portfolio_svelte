<script>
  import { onMount } from 'svelte';
  import * as samplePost from '../../content/blog/sample-post.md';
  import * as secondPost from '../../content/blog/second-post.md';
  
  let samplePostKeys = [];
  let secondPostKeys = [];
  let sampleRaw = '';
  let secondRaw = '';
  
  onMount(() => {
    console.log('Sample post module:', samplePost);
    console.log('Second post module:', secondPost);
    
    samplePostKeys = Object.keys(samplePost);
    secondPostKeys = Object.keys(secondPost);
    
    sampleRaw = samplePost.default || samplePost.raw || '';
    secondRaw = secondPost.default || secondPost.raw || '';
  });
</script>

<div class="container">
  <h1>Markdown Import Test</h1>
  
  <div class="section">
    <h2>Sample Post</h2>
    <p>Available keys: {samplePostKeys.join(', ')}</p>
    
    <details>
      <summary>HTML Content</summary>
      <div class="content-box">
        {@html samplePost.html || 'No HTML content available'}
      </div>
    </details>
    
    <details>
      <summary>Raw Content</summary>
      <pre class="content-box">{sampleRaw || 'No raw content available'}</pre>
    </details>
  </div>
  
  <div class="section">
    <h2>Second Post</h2>
    <p>Available keys: {secondPostKeys.join(', ')}</p>
    
    <details>
      <summary>HTML Content</summary>
      <div class="content-box">
        {@html secondPost.html || 'No HTML content available'}
      </div>
    </details>
    
    <details>
      <summary>Raw Content</summary>
      <pre class="content-box">{secondRaw || 'No raw content available'}</pre>
    </details>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    color: white;
  }
  
  .section {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #111;
    border-radius: 8px;
  }
  
  .content-box {
    background: #222;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 0.5rem;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 300px;
    overflow: auto;
  }
  
  details {
    margin-bottom: 1rem;
  }
  
  summary {
    cursor: pointer;
    padding: 0.5rem;
    background: #333;
    border-radius: 4px;
  }
</style> 