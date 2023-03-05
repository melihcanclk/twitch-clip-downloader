// get last local downloaded file
export const downloadClips = (clip) => {
    const a = document.createElement('a');
    a.href = clip.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
    a.download = clip.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
    navigator.clipboard.writeText(
        clip.broadcaster_name + ' - ' + clip.title
    )

    a.click()
}