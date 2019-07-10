<template>
    <el-col>
        <el-form-item :label='label' :name='name'>
            <el-input 
                type="text"
                v-model="nowval" 
                :placeholder="cong.placeholder" 
                @input='onInput'
                >
                <template slot="suffix">{{cong.unit}}</template>
                </el-input>
        </el-form-item>
    </el-col>
</template>
<script>
export default {
    props:[],
    data(){
        return{
            nowval:''
        }
    }
}
</script>

