export const downloadClips = (clip) => {
    const a = document.createElement('a');
    a.href = clip.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
    console.log(a)
    a.download = clip.title;
    a.click();
}