export const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

if (!cloudinaryCloudName) {
  console.warn('Cloudinary cloud name not configured')
}

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
}

// Generate Cloudinary image URL
export const getCloudinaryImageUrl = (publicId: string, width?: number, height?: number) => {
  if (!cloudinaryCloudName) return ''

  const baseUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/`
  const transformations = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (width || height) transformations.push('c_fill')

  const transform = transformations.length > 0 ? transformations.join(',') + '/' : ''
  return `${baseUrl}${transform}${publicId}`
}
