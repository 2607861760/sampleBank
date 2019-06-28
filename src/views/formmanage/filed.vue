<style lang="scss" scoped>
.filed-contant{
    padding:20px;
    .filed-title{
        font-size: 18px;
        font-weight: bold;
    }
    .filed-inner{
        margin-top:20px;
        display: flex;
        .filed-classify{
            flex:1;
            font-size: 18px;
            .filed-classify-title{
                height:50px;
                line-height: 50px;
            }
            .filed-classify-tree{
                height: 650px;
                margin-top:10px;
                overflow-y: scroll;
                padding:10px;
                border: 1px solid #f2f2f2;
            }
        }
        .filed-add{
            flex:2;
            .filed-classify-edit{
                border: 1px solid #ccc;
                margin: 10px;
                background: #fff;
                padding: 30px 30px 0 30px;
                position: relative;
                clear: both;
                border-radius: 5px;
                .filed-classify-edit-title{
                    width: 100px;
                    height:25px;
                    background: #fff;
                    line-height: 25px;
                    text-align: center;
                    position: absolute;
                    top:-13px;
                    left:10px;
                    z-index: 99;
                }
            }
            .filed-add-title{
                padding: 10px;
                font-size: 18px;
                height: 50px;
                line-height: 50px;
            }
            .filed-add-table{
                padding: 10px;
            }
        }
        &>div{
            float: left;
        }
        &>div+div{
            margin-left: 30px;
        }
    }
}
.el-form-item{
    width: 100%;
}
.el-input,.el-select{
    width: 370px;
}
.el-dialog__body{
    margin: 30px 20px 10px;
}
.filedDialog{
    // .filedoption{
        .el-input,.el-select{
            width: 90%;
        }
    // }
}
.el-table td{
    padding:4px 0;
}
</style>

<template>
    <div class="filed-contant">
        <div class="filed-title">指标库管理</div>
        <div class="filed-inner">
            <div class="filed-classify">
                <div class="filed-classify-title">
                    <span>指标库分类</span>
                    <el-button type="primary" size="medium" style="float:right;margin-top:7px;" @click="addPrimary">添加一级分类</el-button>
                </div>
                <div class="filed-classify-tree">
                    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
            </div>
            <div class="filed-add">
                <div class="filed-classify-edit">
                    <div class="filed-classify-edit-title">编辑分类</div>
                    <div>
                        <el-form :model="classifyForm" label-width="100px" >
                            <el-form-item label="名称">
                                <el-input v-model="classifyForm.name" maxlength="20"></el-input>
                                <span style="padding-left:10px;"></span>
                                <el-button type='primary' size="medium" @click.prevent="edit">修改</el-button>
                                <el-button type='primary' size="medium" @click.prevent="remove">删除</el-button>
                            </el-form-item>
                            <el-form-item label="下级分类">
                                <el-input v-model="classifyForm.nextname" maxlength="20"></el-input>
                                <span style="padding-left:10px;"></span>
                                <el-button type='primary' size="medium" @click.prevent="add">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="filed-add-title">
                    <span>{{classifyForm.name}}</span>
                    <el-button type="primary" size="medium" style="float:right;margin-top:7px;" @click="filedShow() ">添加指标</el-button>
                </div>
                <div class="filed-add-table">
                    <el-table :data='tableData' border max-height='475'>
                        <el-table-column prop="name" label="指标名称"></el-table-column>
                        <el-table-column prop="controlType" label="指标类型"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="medium" @click="filedShow(scope.row)">修改</el-button>
                                <el-button type="primary" plain size="medium" @click="filedRemove(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top:5px;float:right;">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="current"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加一级分类 -->
        <el-dialog title="添加一级分类" :visible.sync="primaryVisible" width='450px'>
            <el-form :model="primaryForm" inline label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="primaryForm.name" placeholder="请输入一级分类名称(20个字符内)" maxlength="20"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="primaryVisible = false">取 消</el-button>
                <el-button type="primary" @click="primaryConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加指标 -->
        <el-dialog title="添加指标" :visible.sync="filedVisible" width='600px' class="filedDialog">
            <div style="font-size: 18px;font-weight: bold;padding: 10px 0;">{{classifyForm.name}}</div>
            <div style="max-height:500px;overflow-y:scroll;">
            <el-form :model="filedForm" label-width="100px">
                <el-form-item label="指标名称">
                    <el-input v-model="filedForm.name"></el-input>
                </el-form-item>
                <el-form-item label="指标类型">
                    <el-select v-model="filedForm.controlType" placeholder="请选择指标类型">
                        <el-option
                        v-for="item in controlList"
                        :key="item.type"
                        :label="item.label"
                        :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input v-model="filedForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="单位" v-if='formShow.UNIT'>
                    <el-input v-model="filedForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="数据长度" v-if='formShow.DATA_LENGTH'>
                    <el-input v-model="filedForm.dataLength"></el-input>
                </el-form-item>
                <el-form-item label="精度" v-if='formShow.PRECISION'>
                    <el-input v-model="filedForm.precisions"></el-input>
                </el-form-item>
                <el-form-item label="最大值" v-if='formShow.MAX'>
                    <el-input v-model="filedForm.maxValue"></el-input>
                </el-form-item>
                <el-form-item label="最小值" v-if='formShow.MIN'>
                    <el-input v-model="filedForm.minValue"></el-input>
                </el-form-item>
                <el-form-item label="选项" v-if='formShow.OPTION'>
                    <el-button type="text" @click="addFiledoption">添加</el-button>
                </el-form-item>
                <el-form-item v-for='(item,index) in optionList' :key='index' class="filedoption" v-if='formShow.OPTION'>
                    <el-col :span='8'>
                        <el-input v-model="item.value" placeholder="请输入选项值"></el-input>
                    </el-col>
                    <el-col :span='8'>
                        <el-input v-model="item.score" placeholder="请输入得分" @keyup.native="numClick(index)"></el-input>
                    </el-col>
                    <el-col :span='8'>
                        <el-input v-model="item.sort" placeholder="请输入序号"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="filedVisible = false">取 消</el-button>
                <el-button type="primary" @click="filedConfirm">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {formApi} from 'api/index.js';
export default { 
    data(){
        return{
            primaryVisible:false,
            filedVisible:false,
            optionList:[],
            formShow:{},
            filedForm:{},
            primaryForm:{},
            // classifyForm:{},
            treeData: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            count:1000,
            tableData:[],
            controlList:[
                {
                    type:1,
                    label:'标题'
                },
                {
                    type:2,
                    label:'文本框'
                },
                {
                    type:3,
                    label:'多行文本框'
                },
                {
                    type:4,
                    label:'整形数值框'
                },
                {
                    type:5,
                    label:'小数数值框'
                },
                {
                    type:6,
                    label:'开关'
                },
                {
                    type:7,
                    label:'单选按钮'
                },
                {
                    type:8,
                    label:'复选框'
                },
                {
                    type:9,
                    label:'下拉菜单'
                },
                {
                    type:10,
                    label:'可查询下拉菜单'
                },
                {
                    type:11,
                    label:'日期'
                },
                {
                    type:12,
                    label:'时间'
                },
                {
                    type:13,
                    label:'日期时间'
                },
            ],
            current:1,
            pagesize:10,
            total:0,
            handle:false
        }
    },
    computed:{
        ...mapGetters([
            'classifyForm'
        ])
    },
    watch:{
        'filedForm.controlType':function(val){
            this.formShow={
                UNIT:false,
                DATA_LENGTH:false,
                MIN:false,
                MAX:false,
                PRECISION:false,
                OPTION:false
            }
            if(val==2){
                this.formShow.UNIT=true;
                this.formShow.DATA_LENGTH=true;
            }else if(val==3){
                this.formShow.DATA_LENGTH=true;
            }else if(val==4){
                this.formShow.UNIT=true;
                this.formShow.MIN=true;
                this.formShow.MAX=true;
            }else if(val==5){
                this.formShow.UNIT=true;
                this.formShow.MIN=true;
                this.formShow.MAX=true;
                this.formShow.PRECISION=true;
            }else if(val==6 || val==7 || val==8 || val==9 || val==10){
                this.formShow.OPTION=true;
            }
        },
        classifyForm:function(val){
            if(!val.id){
                this.tableData=[];
                this.total=0;
                this.current=1;
            }
        }
    },
    methods:{
        handleSizeChange(val){
            this.pagesize=val;
            this.getElementsByCatalogId();
        },
        handleCurrentChange(val){
            this.current=val;
            this.getElementsByCatalogId();
        },
        addPrimary(){
            this.primaryForm={};
            this.primaryVisible=true;
        },
        primaryConfirm(){
            this.setCatage(this.primaryForm.name,0);
            this.primaryVisible=false;
        },
        handleNodeClick(data){
            this.$set(this.classifyForm,'name',data.name)
            this.$set(this.classifyForm,'id',data.id)
            this.$set(this.classifyForm,'parentId',data.parentId)
            this.$set(this.classifyForm,'nextname','')
            this.getElementsByCatalogId()
        },
        handleTree(data,form,handle){
            data.forEach(element => {
                if(element.id==form.id){
                    element.label=form.label;
                }else{
                    if(element.children){
                        this.handleTree(element.children,form)
                    }
                }
            });
            return data
        },
        edit(){
            this.upCatage(this.classifyForm)
        },
        remove(){
            this.delCatage(this.classifyForm.id);
            this.classifyForm={}
        },
        add(){
            this.setCatage(this.classifyForm.nextname,this.classifyForm.id)
        },
        filedShow(row=null){
            if(row==null){
                this.filedForm={};
                this.handle=false;
                if(this.classifyForm.name && this.classifyForm.name!=''){
                    this.filedVisible=true
                }else{
                    this.$message.error('请选择指标库！')
                }
            }else{
                this.filedForm=row;
                this.handle=true;
                this.optionList=this.filedForm.optionLists;
                this.filedVisible=true;
            }
        },
        filedConfirm(){
            let obj={}
            Object.assign(obj,this.filedForm)
            obj['catalogId']=this.classifyForm.id;
            obj['optionJson']=JSON.stringify(this.optionList);
            if(this.handle==false){
                formApi.setElement(obj).then((res)=>{
                    if(res.status){
                        this.filedVisible=false;
                        this.optionList.length=0;
                        this.filedForm={};
                        this.getElementsByCatalogId();
                    }
                })
            }else if(this.handle==true){
                formApi.upElement(obj).then((res)=>{
                    if(res.status){
                        this.filedVisible=false;
                        this.optionList.length=0;
                        this.filedForm={};
                        this.getElementsByCatalogId();
                    }
                })
            }
            
        },
        addFiledoption(){
            this.optionList.push({})
        },
        numClick(index){
            this.optionList[index].score = this.optionList[index].score.replace(/[^\.\d]/g,'');
        },
        getCatage(){
            formApi.getCatage().then((res)=>{
                if(res.status==200){
                    this.treeData=res.data
                }
            })
        },
        setCatage(name,id){
            let obj={
                parentId:id,
                name:name
            }
            formApi.setCatage(obj).then((res)=>{
                if(res.status==200){
                    this.getCatage()
                }
            })
        },
        upCatage(form){
            formApi.upCatage(form).then((res)=>{
                if(res.status==200){
                    this.getCatage()
                }
            })
        },
        delCatage(id){
            let obj={
                id:id
            }
            formApi.delCatage(obj).then((res)=>{
                if(res.status==200){
                    this.getCatage()
                }
            })
        },
        getElementsByCatalogId(id){
            let obj={
                catalogId:this.classifyForm.id,
                page:this.current,
                pagesize:this.pagesize,
            }
            formApi.getElementsByCatalogId(obj).then((res)=>{
                if(res.status==200){
                    this.tableData=res.data.list;
                    this.total=res.data.total;
                }
            })
        }
    },
    mounted(){
        this.getCatage()
    }
}
</script>
