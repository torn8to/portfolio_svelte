import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../../../../');

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
  const { slug } = params;
  
  try {
    const filePath = path.join(projectRoot, 'src', 'content', 'blog', `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new Response('File not found', { status: 404 });
    }
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Return the markdown content
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown'
      }
    });
  } catch (error) {
    console.error(`Error reading markdown file ${slug}.md:`, error);
    return new Response('Error reading file', { status: 500 });
  }
} 