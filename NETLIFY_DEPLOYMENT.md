# 🚀 WISE English Academy - Netlify Deployment Guide

## 🌟 **Why Netlify?**

Netlify is perfect for static exports because:
- ✅ **Native Static Site Support** - No server-side complications
- ✅ **Automatic Deployments** - Deploy on every Git push
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Form Handling** - Built-in form processing
- ✅ **Branch Previews** - Test changes before going live
- ✅ **Free SSL** - Automatic HTTPS certificates
- ✅ **Custom Domains** - Easy domain management

## 📁 **Project Structure Ready for Netlify**

```
wise-english-academy-new-website/
├── tracks.csv                    ← Your data files
├── courses.csv
├── lessons.csv
├── netlify.toml                 ← Netlify configuration
├── next.config.js               ← Next.js config (optimized for Netlify)
├── package.json                 ← Dependencies
├── src/                         ← Next.js app
├── scripts/                     ← Data conversion
└── public/                      ← Static assets
```

## 🔧 **Netlify Configuration**

The `netlify.toml` file includes:
- **Build Settings**: Command and output directory
- **Redirects**: SPA routing support
- **Headers**: Security and caching optimization
- **Environment**: Node.js version

## 🚀 **Deployment Steps**

### **Step 1: Prepare Repository**

```bash
# Navigate to your project
cd /Users/mohammedtumbi/Documents/wise-english-academy-new-website

# Remove Vercel config (already done)
rm -f vercel.json

# Commit Netlify configuration
git add .
git commit -m "Configure for Netlify deployment"
git push origin main
```

### **Step 2: Connect to Netlify**

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login** with GitHub
3. **Click "New site from Git"**
4. **Choose GitHub** as your Git provider
5. **Select your repository**: `wiseenglishacademy/website`

### **Step 3: Configure Build Settings**

Netlify will auto-detect settings from `netlify.toml`, but verify:

```
Build Command: npm run build
Publish Directory: dist
Base Directory: ./
Node Version: 18
```

### **Step 4: Deploy**

1. **Click "Deploy site"**
2. **Wait for build** (2-3 minutes)
3. **Get your live URL**: `https://random-name-123456.netlify.app`

## 🔄 **Automatic Deployments**

### **Production Deployments**
- **Trigger**: Push to `main` branch
- **Result**: Automatic deployment to production
- **URL**: Your custom domain or Netlify subdomain

### **Preview Deployments**
- **Trigger**: Pull requests
- **Result**: Preview URL for testing
- **Benefit**: Test changes before merging

## 🌐 **Custom Domain Setup**

### **Step 1: Add Domain in Netlify**
1. **Go to Site Settings** → **Domain Management**
2. **Click "Add custom domain"**
3. **Enter your domain**: `wiseenglishacademy.org`
4. **Choose DNS provider**

### **Step 2: Configure DNS**
Add these DNS records:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### **Step 3: SSL Certificate**
- **Automatic**: Netlify provides free SSL
- **Status**: Active within minutes
- **Renewal**: Automatic

## 📊 **Performance Optimization**

### **Built-in Features**
- **Global CDN**: 100+ edge locations
- **Image Optimization**: Automatic WebP conversion
- **Gzip Compression**: Automatic compression
- **HTTP/2**: Modern protocol support

### **Custom Headers** (in netlify.toml)
- **Security Headers**: X-Frame-Options, CSP
- **Caching**: Optimized cache control
- **Performance**: Resource hints

## 🔧 **Environment Variables**

### **Optional: Add in Netlify Dashboard**
```
NEXT_PUBLIC_SITE_URL=https://wiseenglishacademy.org
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **How to Add**
1. **Site Settings** → **Environment Variables**
2. **Add Variable**
3. **Redeploy** to apply

## 📈 **Analytics & Monitoring**

### **Netlify Analytics**
- **Page Views**: Track visitor behavior
- **Performance**: Core Web Vitals
- **Errors**: Monitor site health

### **Google Analytics**
- **Setup**: Add GA ID to environment variables
- **Tracking**: Automatic page view tracking
- **Reports**: Detailed visitor analytics

## 🔄 **Content Updates Workflow**

### **Update CSV Data**
```bash
# 1. Update CSV files in root directory
# 2. Convert to JSON
npm run convert-data

# 3. Commit and push
git add .
git commit -m "Update course content"
git push origin main

# 4. Netlify automatically deploys!
```

### **Update Code**
```bash
# 1. Make changes to code
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Add new feature"
git push origin main

# 4. Automatic deployment
```

## 🛡️ **Security Features**

### **Built-in Security**
- **DDoS Protection**: Automatic protection
- **Bot Protection**: Advanced bot filtering
- **Security Headers**: XSS, CSRF protection
- **HTTPS**: Automatic SSL certificates

### **Custom Security** (in netlify.toml)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "origin-when-cross-origin"
    X-XSS-Protection = "1; mode=block"
```

## 📱 **Mobile Optimization**

### **Automatic Features**
- **Responsive Images**: Automatic optimization
- **Mobile Detection**: Smart serving
- **Touch Optimization**: Mobile-friendly interactions

### **PWA Ready**
- **Service Workers**: Offline functionality
- **App Manifest**: Mobile app installation
- **Push Notifications**: User engagement

## 🎯 **Deployment Checklist**

### **Before Deployment**
- [ ] CSV files updated
- [ ] Data converted (`npm run convert-data`)
- [ ] Local testing completed (`npm run dev`)
- [ ] Build successful (`npm run build`)
- [ ] `netlify.toml` configured
- [ ] Code committed and pushed

### **After Deployment**
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Images and videos working
- [ ] Search functionality working
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

## 🚨 **Troubleshooting**

### **Build Failures**
```bash
# Check build locally
npm run build

# Check for errors in Netlify build logs
# Common issues:
# - Missing dependencies
# - TypeScript errors
# - ESLint errors
```

### **Deployment Issues**
- **Check netlify.toml**: Ensure configuration is correct
- **Verify build command**: Should be `npm run build`
- **Check output directory**: Should be `dist`
- **Review build logs**: Look for specific error messages

### **Performance Issues**
- **Enable Netlify Analytics**: Monitor performance
- **Check Core Web Vitals**: Ensure good scores
- **Optimize images**: Use WebP format
- **Enable compression**: Automatic in Netlify

## 🌟 **Advanced Features**

### **Form Handling**
- **Contact Forms**: Automatic form processing
- **Email Notifications**: Built-in email service
- **Spam Protection**: Advanced filtering

### **Branch Deploys**
- **Feature Branches**: Test new features
- **Staging Environment**: Pre-production testing
- **Rollback**: Easy rollback to previous versions

### **Edge Functions**
- **Serverless Functions**: Dynamic functionality
- **API Routes**: Backend capabilities
- **Database Integration**: Connect to databases

## 📞 **Support**

### **Netlify Support**
- **Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Community**: [community.netlify.com](https://community.netlify.com)
- **Support**: Available for paid plans

### **Your Site**
- **URL**: `https://your-site-name.netlify.app`
- **Admin**: Netlify Dashboard
- **Analytics**: Built-in analytics

---

## 🎉 **Success!**

Your WISE English Academy will be live on Netlify with:
- ✅ **Fast Global CDN**
- ✅ **Automatic HTTPS**
- ✅ **Easy Content Updates**
- ✅ **Professional Performance**
- ✅ **Mobile Optimization**
- ✅ **SEO Ready**

**Next Steps**: Set up custom domain and analytics!
