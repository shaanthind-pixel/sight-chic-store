# How to Change Product Images

There are multiple ways to change product images in your Sight Chic Store. Here are all the options:

## Option 1: Admin Panel (Recommended - Easiest) ⭐

The easiest and most user-friendly way is using the Admin Panel at `/admin`:

### Steps:
1. **Go to Admin Panel**
   - Navigate to `http://localhost:8080/admin`

2. **Find the "Manage Product Images" section**
   - You'll see all your products listed with their current images

3. **Expand a Product**
   - Click on any product to expand it and see image upload options

4. **Upload Main Image**
   - Click "Upload" next to "Main Product Image"
   - Select a new image file from your computer
   - Image uploads automatically to Firebase Cloud Storage
   - Your product is updated with the new image

5. **Add Gallery Images**
   - Click "Add" next to "Gallery Images"
   - Upload additional images for the product gallery
   - All images are displayed in a grid below

### Requirements:
- Image formats: JPG, PNG, WebP
- Recommended size: 1200x1200px or larger
- Images are automatically optimized by Firebase

---

## Option 2: Firebase Console (Direct Database Management)

For more control and direct database access:

### Steps:
1. **Go to Firebase Console**
   - Navigate to [console.firebase.google.com](https://console.firebase.google.com)
   - Select your "sight-chic-store" project

2. **Navigate to Storage**
   - Click "Build" → "Storage"
   - Browse to `product-images/` folder

3. **Upload Images**
   - Drag and drop images or click upload
   - Firebase stores them in the correct folder structure

4. **Update Firestore**
   - Go to "Firestore Database"
   - Click on "products" collection
   - Select a product document
   - Edit the `image` (main) or `images` (gallery) fields
   - Paste the image URLs from Storage

5. **Get Image URLs**
   - In Cloud Storage, right-click an image
   - Click "Copy download URL"
   - Use this URL in Firestore

---

## Option 3: Programmatic Image Upload (For Developers)

If you want to implement custom image upload functionality:

### Using the Service Function:

```typescript
import { uploadProductImage } from "@/services/firestoreService";

// Upload an image
const file = imageInputElement.files[0];
const imageUrl = await uploadProductImage(file, productId, 'main');

// The URL is automatically returned
console.log("New image URL:", imageUrl);
```

### Parameters:
- `file` - The image file from an input element
- `productId` - The product ID (number)
- `imageType` - Either `'main'` for main image or `'gallery'` for gallery

### Example Component:

```typescript
const [file, setFile] = useState<File | null>(null);

const handleUpload = async () => {
  if (!file) return;
  
  try {
    const url = await uploadProductImage(file, 1, 'main');
    console.log("Image uploaded:", url);
    // Update product state, show success message, etc.
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

return (
  <div>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />
    <button onClick={handleUpload}>Upload Image</button>
  </div>
);
```

---

## Option 4: Batch Image Upload via Script

For uploading multiple images at once:

### Using Firebase CLI:

```bash
# Install Firebase CLI (already installed)
firebase login

# Upload images to Cloud Storage
firebase deploy --only storage

# Or use gsutil
gsutil -m cp -r ./images gs://your-bucket/product-images/
```

---

## Image Storage Structure

Your images are organized in Firebase Cloud Storage as:

```
bucket/
└── product-images/
    ├── product-1/
    │   ├── main-1714000000000.jpg
    │   └── gallery-1714000000001.jpg
    ├── product-2/
    │   ├── main-1714000000002.jpg
    │   └── gallery-1714000000003.jpg
    └── ...
```

Each image has a timestamp to ensure uniqueness.

---

## Image URL Format

Firebase Storage URLs look like:
```
https://firebasestorage.googleapis.com/v0/b/sight-chic-store.appspot.com/o/product-images%2Fproduct-1%2Fmain-1714000000000.jpg?alt=media&token=abc123...
```

These URLs are automatically generated and stored in Firestore.

---

## Troubleshooting

### Issue: "Permission denied" when uploading
- **Solution**: Check your Firebase Storage Rules allow write access with test mode enabled
- Go to Storage → Rules → Ensure test mode allows writes

### Issue: Images not showing after upload
- **Solution**: Check that image URLs are being saved correctly in Firestore
- Verify the URL is accessible in a browser
- Check browser console for CORS errors (shouldn't happen with Firebase)

### Issue: Large file sizes
- **Solution**: Compress images before uploading
- Use tools like:
  - TinyPNG.com
  - CompressJPEG.com
  - Or use `npm install sharp` for command-line compression

### Issue: Slow uploads
- **Solution**: Images upload slowly on slow connections
- Break uploads into batches of 5-10 images
- Use smaller sized images (optimize first)

---

## Best Practices

1. **Optimize Images First**
   - Compress before uploading to save bandwidth and storage
   - Use appropriate formats (JPG for photos, PNG for transparency)

2. **Consistent Sizing**
   - Keep main images at same dimensions (e.g., 1200x1200px)
   - Makes your site look professional

3. **Descriptive Naming**
   - Use clear filenames: `glasses-brown-front.jpg` not `image1.jpg`
   - Helps with organization

4. **Backup Images**
   - Keep backups of your original images
   - Firebase backup is automatic, but local copies are good

5. **Test Images**
   - Always check product pages after uploading new images
   - Verify images load correctly on mobile and desktop

---

## Quick Reference

| Task | How | Where |
|------|-----|-------|
| Upload images | File input form | `/admin` page |
| Direct storage access | Upload/delete files | Firebase Console → Storage |
| Update URLs in database | Edit product documents | Firebase Console → Firestore |
| Programmatic uploads | Call `uploadProductImage()` | Your React components |
| Batch uploads | gsutil or Firebase CLI | Command line |

---

## Next Steps

- Set up automated image optimization (consider Cloudinary integration)
- Implement product image moderation
- Add image cropping/editing tools
- Set up CDN for faster image delivery

Happy image managing! 🎨
