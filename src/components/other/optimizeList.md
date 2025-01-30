SubmitButton.vue
这个组件实现了一个带有附件功能的输入框，整体结构清晰，但还有一些可以优化的地方。我来帮你分析一下：

自动高度文本域：

优点：通过 oninput 直接操作 DOM 实现自动高度

建议：改用 Vue 的响应式方式处理，避免直接操作 DOM

ts
复制
const adjustTextareaHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${Math.min(textarea.value.scrollHeight, 350)}px`
  }
}

watch(() => textarea.value?.value, adjustTextareaHeight)
附件处理：

优点：图片预览和文件类型处理得当，内存管理完善

建议：

添加文件类型校验白名单

限制最大文件数量/大小

添加 loading 状态提升用户体验

键盘事件：
当前代码中缺少键盘事件处理逻辑，建议补充：

ts
复制
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.ctrlKey) {
    e.preventDefault()
    submit()
  }
  if (e.ctrlKey && e.key === 'Enter') {
    textarea.value?.insertAtCursor('\n')
  }
}
代码结构优化：
建议将文件处理逻辑抽离为独立 composable：

ts
复制
// useAttachments.ts
export const useAttachments = () => {
  // 文件处理相关逻辑...
  return { attachments, handleFileSelect, removeAttachment }
}
类型安全：
可以增强类型检查：

ts
复制
type AttachmentType = 'image' | 'file'
type FileType = 
  | 'image/*'
  | 'application/pdf'
  | 'text/markdown'
  // ...其他类型

interface Attachment {
  file: File
  type: AttachmentType
  preview?: string
  name: string
  size: string
  fileType: FileType
}
样式建议：

添加 overflow-hidden 到附件容器防止按钮溢出

为滚动条添加自定义样式：

css
复制
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
可访问性：

为图标按钮添加 aria-label

为文件输入框添加 ARIA 属性

html
复制
<input 
  aria-label="文件上传"
  aria-describedby="file-input-help"
>
运行 HTML
性能优化：

对 formatFileSize 使用记忆函数

使用虚拟滚动优化大量附件时的性能