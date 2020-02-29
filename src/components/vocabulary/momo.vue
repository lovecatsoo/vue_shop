<template>
    <div>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="breaking bad" name="1">
                <div class="episodes">
                    <a href="">s1e1</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>

                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                    <a href="">s1e2</a>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '1',
      vocabulary: [
        { id: 1,
          name: 'breakingbad',
          episodes: [
            { title: 's1e1',
              words: [
                { word: '', notes: '', examples: '' }
              ],
              phrases: [
                { phrase: '', notes: '', examples: '' }
              ] }

          ] }
      ]
    }
  },
  methods () {

  }
}
</script>
<style lang="scss">
    .el-collapse-item__content{
        .episodes{
           display: flex;
           flex-wrap: wrap;
           min-height: 200px;
           font-size: 20px;
            flex-wrap: wrap;
           a{
               text-decoration: none;
               width: 100px;
               height: 30px;
               padding: 10px 20px;
               text-align: center;
           }
        }

    }
</style>
