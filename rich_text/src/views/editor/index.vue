<template>
<div>
  <quill-editor
    class="editor"
    ref="myTextEditor"
    v-model="content"
    :options="editorOption"
    @change="onEditorChange($event)"
    @ready="ready($event)"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
  >
  </quill-editor>
  <el-button type="primary" @click="submit" class="button">提交</el-button>
</div>
</template>

<script>
import { lineHeightStyle, fontSizeStyle } from '@utils/lineHeight';
import Quill from 'quill';
// import { ImageDrop } from 'quill-image-drop-module';
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize);
Quill.register(fontSizeStyle, true);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  // [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  // [{ size: ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px'] }], // 字体大小
  // [{ 'size': ['small', false, 'large', 'huge'] }],
  [
    {
      size: fontSizeStyle.whitelist,
    },
  ], 
   [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'], // 链接、图片、视频
  [{ lineheight: ['initial', '1', '1.5', '1.75', '2', '3', '4', '5'] }], // 对齐方式
]; //工具菜单栏配置
export default {
  data() {
    return {
      contentCode: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
            // 行高
              lineheight: function (value) {
                if (value) {
                  console.log('lineheight', this.quill)
                  this.quill.format('lineHeight', value);
                } else {
                  console.log(value);
                }
              },
            },
          },
          // 调整图片大小 ，一定要放对位置
          // imageResize: {     
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white',
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar'],
          // },
          // imageDrop: true,
        },
        placeholder: '', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
        history: {
          delay: 1000,
          maxStack: 50,
          userOnly: false,
        },
      },
    };
  },
  props: ['datas'],
  created() {
  },
  methods: {
    onEditorBlur() {
      // console.log("editor blur!", quill, this.content);
      //this.$emit("editorBlur", this.content);
      this.contentCode = this.content;
    },
    onEditorFocus() {
      this.contentCode = this.content;
    },
    // 值发生变化
    onEditorChange(editor) {
      // console.log('onEditorChange', editor);
      this.content = editor.html;
      this.$emit('content', editor.html);
    },
    ready() {
      console.log('ready了')
      Quill.register({ 'formats/lineHeight': lineHeightStyle }, true);
    },
    submit() {
      console.log('click submit')
      // this.content = JSON.parse(JSON.stringify(this.content).replace(`<p><br></p>`, ''));
      console.log('>>>>>>>>', JSON.stringify(this.content));
    }
  },
};
</script>

<style>
.editor {
  line-height: normal !important;
  height: 800px;
  margin-bottom: 30px;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

/* .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
} */
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: attr(data-value) !important;
}

/* .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}
 */


.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label::before {
  content: '行高';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='initial']::before {
  content: '默认';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1']::before {
  content: '1';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.5']::before {
  content: '1.5';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.75']::before {
  content: '1.75';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='2']::before {
  content: '2';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='3']::before {
  content: '3';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='4']::before {
  content: '4';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='5']::before {
  content: '5';
}
.ql-snow .ql-picker.ql-lineheight {
  width: 70px;
}
.editor {
  height: 600px;
}
.button {
  position: relative;
  z-index: 100;
}
</style>