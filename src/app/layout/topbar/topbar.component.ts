import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit{
  keywords:any=''
  
  topbar:any={
    leftNav:['About','Contact','Help','FAQs'],
    customerService:{
      title:'Customer Service',
      phone:'+012 345 6789'
    }
  }
  myAccDropdown:any={
    navitem:'My Account',
    dropdown:['sign in','sign up']
  }
  currencyDropDown:any={
    navitem:'USD',
    dropdown:['USD','EUR','GBP','CAD','INR']
  }
  languageDropDown:any={
    navitem:'EN',
    dropdown:['EN','AR','FR','RU','HI','GU']
  }
  constructor(private productsService:ProductsService,private route:Router,private changederreff:ChangeDetectorRef){

  }
  ngOnInit(): void {
    // this.productsService.isLogin.next(true)
    this.userNameDecode()
    this.getCurrencyValue()
  }
  searchProduct(){
    console.log('keywords==>',this.keywords);
    if (this.keywords) {
      this.route.navigate(['/shop/shoplist'],{ queryParams: { search: this.keywords } })
    }
    this.keywords=''
    
  }
  getCurrencyValue(){
    this.productsService.getCurrencyValueApi().subscribe({
      next:(res:any)=>{
        this.productsService.setLocalStorage('currencyApiData',JSON.stringify(res.data))
      }
    })
  }
  onClickCurrency(selectedItem:any){
    this.productsService.setLocalStorage('currencyValue',selectedItem)
    this.productsService.currency.next(true)
    this.changederreff.markForCheck()
  }
  languageChange(selectedLanguage:any){
    let language=selectedLanguage.toLowerCase()
     document.cookie = 'googtrans=' + `/en/${language}`;
     location.reload()
    this.changederreff.markForCheck()
  }
  myAccount(value:any){
    if (value=='Log out') {
      this.productsService.isLogin.next(false)
      this.logOut()
    }else{
      this.route.navigateByUrl(value)
    }
  }
  userNameDecode(){
    this.myAccDropdown.dropdown.push('Log out')
    this.productsService.isLogin.subscribe({
      next:(res:any)=>{
          this.myAccDropdown.navitem=this.productsService.decodeUserName()
      }
    })
  }
  logOut(){
    this.productsService.logoutUser({}).subscribe({
      next:(res:any)=>{
        if (res.type=='success') {
          localStorage.removeItem('login')
          this.myAccDropdown.navitem='My Account'
          this.route.navigateByUrl('/')
        }
        console.log('res==>',res);
      }
    })
  }
  
}
