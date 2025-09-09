# 🚀 WISE English Academy - Deployment Guide

## 📁 **Updated CSV File Structure**

### **Location**: Parent Directory of `website` folder
Place your CSV files in: `/Users/mohammedtumbi/Documents/wise-english-academy-new-website/`

### **Required File Names** (Simplified):
1. **Tracks CSV**: `tracks.csv`
2. **Courses CSV**: `courses.csv`  
3. **Lessons CSV**: `lessons.csv`

### **Directory Structure**:
```
wise-english-academy-new-website/
├── tracks.csv          ← Place your tracks data here
├── courses.csv         ← Place your courses data here
├── lessons.csv         ← Place your lessons data here
└── website/
    ├── src/
    ├── scripts/
    ├── package.json
    └── next.config.js
```

## 🔄 **Data Update Process**

### **Step 1: Update CSV Files**
```bash
# Navigate to parent directory
cd /Users/mohammedtumbi/Documents/wise-english-academy-new-website

# Replace your CSV files here:
# - tracks.csv
# - courses.csv  
# - lessons.csv
```

### **Step 2: Convert Data**
```bash
# Navigate to website directory
cd website

# Convert CSV to JSON
npm run convert-data
```

### **Step 3: Test Locally**
```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

## 🚀 **Vercel Deployment Guide**

### **Method 1: Vercel CLI (Recommended)**

#### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

#### **Step 2: Login to Vercel**
```bash
vercel login
```

#### **Step 3: Deploy from Website Directory**
```bash
cd /Users/mohammedtumbi/Documents/wise-english-academy-new-website/website

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Choose your account)
# - Link to existing project? No
# - Project name: wise-english-academy
# - Directory: ./
# - Override settings? No
```

#### **Step 4: Production Deployment**
```bash
# Deploy to production
vercel --prod
```

### **Method 2: Vercel Dashboard (Alternative)**

#### **Step 1: Prepare for Upload**
```bash
cd /Users/mohammedtumbi/Documents/wise-english-academy-new-website/website

# Build the project
npm run build

# The static files will be in the 'dist' folder
```

#### **Step 2: Upload to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub, GitLab, or Bitbucket
3. Click "New Project"
4. Choose "Import Git Repository" or "Upload"
5. If uploading:
   - Drag and drop the `website` folder
   - Or zip the `website` folder and upload
6. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### **Step 3: Deploy**
1. Click "Deploy"
2. Wait for deployment to complete
3. Get your live URL

### **Method 3: GitHub Integration (Best for Updates)**

#### **Step 1: Create GitHub Repository**
```bash
cd /Users/mohammedtumbi/Documents/wise-english-academy-new-website

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - WISE English Academy"

# Create GitHub repository and push
# (Follow GitHub's instructions to create repo and push)
```

#### **Step 2: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

#### **Step 3: Automatic Deployments**
- Every push to main branch = automatic deployment
- Pull requests = preview deployments
- Easy updates by pushing CSV changes

## 🔧 **Vercel Configuration**

### **Environment Variables** (Optional)
In Vercel dashboard, add these environment variables:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **Custom Domain** (Optional)
1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📊 **Deployment Checklist**

### **Before Deployment**:
- [ ] CSV files updated in parent directory
- [ ] Data converted with `npm run convert-data`
- [ ] Local testing completed (`npm run dev`)
- [ ] Build successful (`npm run build`)

### **After Deployment**:
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Images and videos working
- [ ] Search functionality working
- [ ] Mobile responsive
- [ ] SEO meta tags present

## 🚨 **Troubleshooting**

### **Common Issues**:

#### **1. Build Errors**
```bash
# Clean and rebuild
rm -rf .next dist
npm run build
```

#### **2. CSV Not Found**
- Ensure CSV files are in parent directory
- Check filenames: `tracks.csv`, `courses.csv`, `lessons.csv`
- Run `npm run convert-data` before building

#### **3. Vercel Deployment Fails**
- Check `next.config.js` has `output: 'export'`
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

#### **4. Images Not Loading**
- Add placeholder images to `public/images/`
- Update image paths in hero banners
- Use absolute URLs for external images

### **Performance Optimization**:
- Enable Vercel's Edge Network
- Use Vercel's Image Optimization
- Enable Compression
- Set up CDN for static assets

## 📈 **Post-Deployment**

### **Analytics Setup**:
1. Add Google Analytics
2. Set up Vercel Analytics
3. Monitor Core Web Vitals
4. Track user engagement

### **SEO Verification**:
1. Test with Google Search Console
2. Verify sitemap.xml
3. Check robots.txt
4. Test social media sharing

### **Monitoring**:
1. Set up uptime monitoring
2. Monitor error rates
3. Track page load speeds
4. Monitor user feedback

## 🎯 **Quick Deployment Commands**

```bash
# Complete deployment workflow
cd /Users/mohammedtumbi/Documents/wise-english-academy-new-website/website

# 1. Update data
npm run convert-data

# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to Vercel
vercel --prod
```

## 🌟 **Success!**

Your WISE English Academy will be live at:
- **Vercel URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

The platform will automatically:
- ✅ Serve static files from CDN
- ✅ Handle SSL certificates
- ✅ Provide global edge caching
- ✅ Scale automatically
- ✅ Monitor performance

---

**Need Help?** Check Vercel's documentation or contact support for deployment issues.
