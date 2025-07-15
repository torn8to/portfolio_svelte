import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { json } from '@sveltejs/kit';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../../../');

export async function GET({ params }) {
  const { path: filePath } = params;
  
  try {
    // Ensure the path is within the project directory
    const fullPath = path.join(projectRoot, filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return new Response('File not found', { status: 404 });
    }
    
    // Read file content
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Return the markdown content
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown'
      }
    });
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return new Response('Error reading file', { status: 500 });
  }
} 