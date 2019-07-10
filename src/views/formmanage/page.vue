<style lang="scss" scoped>
.page-contant{
    padding:20px;
    .page-title{
        font-size: 18px;
        font-weight: bold;
    }
    .page-inner{
        margin-top:20px;
        display: flex;
        .page-template{
            flex:1;
            font-size: 18px;
            .page-template-title{
                height:50px;
                line-height: 50px;
            }
            .page-template-tree{
                height: 650px;
                margin-top:10px;
                overflow-y: scroll;
                padding:10px;
                border: 1px solid #f2f2f2;
                .tree-list{
                    height: 30px;
                    line-height: 30px;
                    color: #909399;
                    cursor: pointer;
                }
            }
        }
        .page-template-detail{
            flex:2;
            .page-template-detail-handle{
                width: 100%;
                height:50px;
                line-height: 50px;
            }
            .page-template-detail-table{
                margin-top: 10px;
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
.filed{
    display: flex;
    &>div{
        float: left;
    }
    .filed-left{
        flex:1
    }
    .filed-right{
        flex:2;
        .filed-search{
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
        }
        .filed-table{
            margin-top:10px;
        }
    }
    .filedClass{
        height: 500px;
        margin-top:10px;
        overflow-y: scroll;
        padding:10px;
        border: 1px solid #f2f2f2; 
    }
    &>div+div{
        margin-left: 15px;
    }
}

</style>

<template>
    <div class="page-contant">
        <div class="page-title">表单模板管理</div>
        <div class="page-inner">
            <div class="page-template">
                <div class="page-template-title">
                    <span>表单模板</span>
                    <el-button type="primary" size="medium" style="float:right;margin-top:7px;" @click="addTemplate">添加表单模板</el-button>
                </div>
                <!-- <div > -->
                    <!-- <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
                    <el-card shadow="never" class="page-template-tree">
                        <div v-for="item in treeData" :key="item.id" class='tree-list'>
                            <div style="float:left;"  @click="choiceTemplate(item)">{{item.name }}</div>
                            <div style="float:right;height: 100%;">
                                <el-button type="text" @click="editTemplate(item)">编辑</el-button>
                                <el-button type="text" @click="delTemplate(item)">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                <!-- </div> -->
            </div>
            <div class="page-template-detail">
                <div class="page-template-detail-handle">
                    <div style="float:left;">{{templateInfo.name}}</div>
                    <div style="float:right;font-size:18px;font-weight:bold;" v-if='templateInfo.name && templateInfo.name!=""'>
                        <el-button type="primary" size='medium' @click="corRelation">关联</el-button>
                        <el-button type="primary" size='medium' @click="filedInput">导入</el-button>
                        <el-button type="primary" size='medium'>预览</el-button>
                    </div>
                    
                </div>
                <div class="page-template-detail-table">
                    <el-table :data='tableData' border max-height='475'>
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="elementName" label="指标名称"></el-table-column>
                        <el-table-column label="数据类型">
                            <template slot-scope='scope'>
                                {{scope.row.control | mapType}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sort" label="排序"></el-table-column>
                        <el-table-column prop="displaySort" label="显示序号"></el-table-column>
                        <el-table-column prop="isCanSerch" label="是否作为搜索条件">
                            <template slot-scope='scope'>
                                {{scope.row.isCanSerch | isFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="isEnable" label="是否启用">
                            <template slot-scope='scope'>
                                {{scope.row.isEnable | isFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="isRequired" label="是否为必填项">
                            <template slot-scope='scope'>
                                {{scope.row.isRequired | isFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="small" @click="filedShow(scope.row)">编辑</el-button>
                                <el-button type="primary" plain size="small" @click="filedRemove(scope.row)">删除</el-button>
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

        <!-- 添加表单模板 -->
        <el-dialog title="表单模板" :visible.sync="templateVisible" width='600px'>
            <el-form :model="templateForm" label-width="80px">
                <el-col :span='24'>
                    <el-form-item label="名称">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="行数">
                        <el-input v-model="templateForm.rowCount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="列数">
                        <el-input v-model="templateForm.columnCount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="行间距">
                        <el-input v-model="templateForm.rowSpace"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="列间距">
                        <el-input v-model="templateForm.columnSpace"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="页面宽">
                        <el-input v-model="templateForm.pageWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="页面高">
                        <el-input v-model="templateForm.pageHeight"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="X">
                        <el-input v-model="templateForm.positionX"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="Y">
                        <el-input v-model="templateForm.positionY"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="显示方式">
                        <el-radio-group v-model="templateForm.openMethod">
                            <el-radio :label="1">弹出</el-radio>
                            <el-radio :label="2">非弹出</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="2" v-model="templateForm.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="templateVisible = false">取 消</el-button>
                <el-button type="primary" @click="templateConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 关联 -->
        <el-dialog title="关联指标" :visible.sync="correlationVisible" width='800px'>
            <div>
                <el-select v-model="relationId">
                    <el-option v-for='item in relationList' :key='item.id' :value="item.id" :label='item.elementName'></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" size='medium' @click="addRelation"></el-button>
            </div>
            <div style="margin-top:10px;">
                <el-table :data='relationData' border max-height="400">
                    <el-table-column label="关系">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.joinCondition">
                                <el-option value='1' label='并'></el-option>
                                <el-option value='2' label='或'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="指标">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.mappingElementId" @change='getFiledValue'>
                                <el-option 
                                v-for='item in relationList' 
                                :key='item.id' 
                                :value="item.id" 
                                :label='item.elementName' 
                                v-if='relationId!=item.id &&(item.control==7 || item.control==8 || item.control==9 || item.control==10)'
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="条件">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.elementValueId">
                                <el-option v-for='item in valueList' :key='item.id' :value="item.id" :label='item.name'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-delete" size='medium'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="primaryVisible = false">取 消</el-button>
                <el-button type="primary" @click="primaryConfirm">保 存</el-button>
            </div>
        </el-dialog>

        <!-- 导入 -->
        <el-dialog title="导入指标" :visible.sync="inputVisible" width='1000px'>
            <div class="filed">
                <div class="filed-left">
                    <div>
                        <el-input placeholder="指标分类名称" v-model="filedClass">
                            <el-button slot="append" @click="filedClassSearch">查询</el-button>
                        </el-input>
                        
                    </div>
                    <div class="filedClass">
                        <el-tree :data="filedData" :props="defaultProps" @node-click="handleNodeClick" :highlight-current='true'></el-tree>
                    </div>
                </div>
                <div class="filed-right">
                    <div class="filed-search">
                        <div style='float:left;'>指标列表</div>
                        <div style="float:right;">
                            <el-input placeholder="指标名称" v-model="filedName">
                                <el-button slot="append" @click="filedNameSearch">查询</el-button>
                            </el-input>
                        </div>
                       
                    </div>
                    <div class="filed-table">
                        <el-table :data="filedList" border max-height='450' @selection-change="handleSelectionChange">
                            <el-table-column type='selection'></el-table-column>
                            <el-table-column prop='name' label='指标名称'></el-table-column>
                            <el-table-column label='指标类型'>
                                <template slot-scope="scope">
                                    {{ scope.row.controlType | mapType}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="margin-top:5px;">
                            <el-pagination
                                @size-change="filedSizeChange"
                                @current-change="filedCurrentChange"
                                :current-page="filedcurrent"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="filedpagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="filedtotal"
                                style="float:left;">
                            </el-pagination>
                            <div style="float:right;">
                                <el-button type="primary" size='medium' @click="inputFiledAll">全部导入</el-button>
                                <el-button type="primary" size='medium' @click="inputFiled">导入</el-button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑指标" :visible.sync="filedVisible" width='600px'>
                <div style="font-size:16px;font-weight:bold;">{{filedForm.elementName}}</div>
                <el-form :model="filedForm" label-width="120px" style="overflow: hidden;">
                    <el-col :span='12'>
                        <el-form-item label='指标排序'>
                            <el-input v-model="filedForm.sort" @keyup.native="numClick('filedForm','sort')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='显示序号'>
                            <el-input v-model="filedForm.displaySort" @keyup.native="numClick('filedForm','displaySort')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='是否为必填项'>
                            <el-checkbox v-model="filedForm.isRequired" :true-label='1'>是</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='是否启用'>
                            <el-checkbox v-model="filedForm.isEnable" :true-label='1'>是</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='是否为搜索条件'>
                            <el-checkbox v-model="filedForm.isCanSerch" :true-label='1'>是</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:10px;">
                    <el-button @click="filedVisible = false">取 消</el-button>
                    <el-button type="primary" @click="filedConfirm">确 定</el-button>
                </div>
        </el-dialog>
    </div>
</template>
<script>
import {pageApi,formApi} from 'api/index.js';
import {mapCol} from 'base/common.js';
export default {
    data(){
        return{
            filedVisible:false,
            inputVisible:false,
            templateVisible:false,
            templateForm:{},
            templateInfo:{},
            filedForm:{},
            correlationVisible:false,
            relationList:[],
            relationData:[],
            valueList:[],
            count:1000,
            treeData: [],
            filedData:[],
            pagesize:10,
            current:1,
            total:0,
            tableData:[],
            defaultProps:{
                children: 'child',
                label: 'name'
            },
            filedList:[],
            filedcurrent:1,
            filedpagesize:10,
            filedtotal:0,
            multipleSelection:[],
            filedClass:'',
            filedName:'',
            relationId:''
        }
    },
    filters:{
        mapType(val){
            return mapCol(val)
        },
        isFilter(val){
            if(val==1){
                return '是'
            }
            return '否'
        }
    },
    methods:{
        primaryConfirm(){

        },
        //获取指标值
        getFiledValue(val){
            console.log(val)
        },
        //添加关联关系
        addRelation(){
            this.relationData=[...this.relationData,{}]
        },
        //点击关联按钮
        corRelation(){
            this.correlationVisible=true;
            let objs={
                formid:this.templateInfo.id,
                page:1,
                pagesize:1000
            }
            this.getElementByPid(objs)
        },
        // 指标库查询
        filedClassSearch(){
            this.getCatage(this.filedClass)
        },
        //表单元素查询
        filedNameSearch(){
            this.filedcurrent=1;
            this.filedpagesize=10;
            let obj={
                id:this.filedId,
                sname:this.filedName
            }
            this.getElementsByCatalogId(obj)
        },
        //表单元素删除
        filedRemove(row){
            let obj={
                formid:row.formId,
                id:row.id
            }
            pageApi.delElement(obj).then((res)=>{
                if(res.status==200){
                    let objs={
                        formid:this.templateInfo.id,
                        page:this.current,
                        pagesize:this.pagesize
                    }
                    this.getElementByPid(objs)
                }
            })
        },
        //只能输入数字
        numClick(form,name){
            this[form][name]=Number(this[form][name].replace(/[^\.\d]/g,''));
        },
        //编辑表单元素
        filedConfirm(){
            pageApi.upElement(this.filedForm).then((res)=>{
                if(res.status==200){
                    this.getElementsByCatalogId(this.filedId)
                    this.filedVisible=false;
                }
            })
        },
        //导入表单元素页码和每页显示改变
        filedSizeChange(val){
            this.filedpagesize=val;
            this.getElementsByCatalogId(this.filedId)
        },
        filedCurrentChange(val){
            this.filedcurrent=val;
            this.getElementsByCatalogId(this.filedId)
        },
        //表格选择  导入表单
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //导入表单按钮
        inputFiled(){
            let arr=[];
            arr=this.multipleSelection.map(item=>{
                let obj={}
                obj['formId']=this.templateInfo.id;
                obj['elementId']=item.id;
                return obj
            })
            pageApi.importElement(arr).then((res)=>{
                if(res.status==200){
                    let objs={
                        formid:this.templateInfo.id,
                        page:this.current,
                        pagesize:this.pagesize
                    }
                    this.getElementByPid(objs)
                    this.inputVisible=false;
                }
            })
        },
        //全部导入
        inputFiledAll(){
            let obj={
                formid: this.templateInfo.id,
                catalogid:this.filedId
            }
            pageApi.importElementByCatalogId(obj).then((res)=>{
                if(res.status==200){
                    let objs={
                        formid:this.templateInfo.id,
                        page:this.current,
                        pagesize:this.pagesize
                    }
                    this.getElementByPid(objs)
                    this.inputVisible=false;
                }
            })
        },
        //表单树选择
        handleNodeClick(data){
            this.filedId=data.id;
            this.getElementsByCatalogId(data)
        },
        //获取表单列表
        getElementsByCatalogId(form){
            let obj={
                catalogId:form.id,
                page:this.filedcurrent,
                pagesize:this.filedpagesize,
            }
            if(form.sname){
                obj['name']=form.sname
            }
            formApi.getElementsByCatalogId(obj).then((res)=>{
                if(res.status==200){
                    this.filedList=res.data.list;
                    this.filedtotal=res.data.total;
                }
            })
        },
        //获取表单树
        getCatage(name=null){
            let obj={}
            if(name!=null){
                obj['name']=name
            }
            formApi.getCatage(obj).then((res)=>{
                if(res.status==200){
                    this.filedData=res.data
                }
            })
        },
        //点击导入按钮
        filedInput(){
            this.getCatage();
            this.inputVisible=true;
        },
        //添加表单模板
        addTemplate(){
            this.templateForm={};
            this.templateVisible=true;
        },
        //编辑表单模板
        editTemplate(item){
            this.getPage(item.id);
            this.templateVisible=true;
        },
        // 删除表单模板
        delTemplate(item){
            let obj={
                id:item.id
            }
            pageApi.delPageById(obj).then((res)=>{
                if(res.status==200){
                    this.getPage()
                }
            })
        },
        // 表单模板的页数和每页显示改变
        handleSizeChange(val){
            this.pagesize=val;
            let objs={
                formid:this.templateInfo.id,
                page:this.current,
                pagesize:this.pagesize
            }
            this.getElementByPid(objs)
        },
        handleCurrentChange(val){
            this.current=val;
            let objs={
                formid:this.templateInfo.id,
                page:this.current,
                pagesize:this.pagesize
            }
            this.getElementByPid(objs)
        },
        // 选择模板
        choiceTemplate(item){
            this.templateInfo=item;
            let objs={
                formid:this.templateInfo.id,
                page:this.current,
                pagesize:this.pagesize
            }
            this.getElementByPid(objs);
        },
        // 模板中表单元素编辑
        filedShow(row){
            this.filedForm=row;
            this.filedVisible=true;
        },
        // 获取模板中的表单元素
        getElementByPid(obj){
            pageApi.getElementByPid(obj).then((res)=>{
                if(res.status==200){
                    if(this.correlationVisible==true){
                        this.relationList=res.data.list;
                    }else{
                        this.tableData=res.data.list;
                        this.total=res.data.total;
                    }
                    
                }
            })
        },
        // 模板保存
        templateConfirm(){
            pageApi.setPage(this.templateForm).then((res)=>{
                if(res.status==200){
                    this.getPage()
                    this.templateVisible=false;
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        // 获取模板列表
        getPage(id=null){
            let obj={}
            if(id!=null){
                obj['id']=id
            }
            pageApi.getPage(obj).then((res)=>{
                if(res.status==200){
                    if(id==null){
                        this.treeData=res.data.list
                    }else{
                        this.templateForm=res.data;
                    }
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    },
    mounted(){
        this.getPage()
    }
}
</script>

