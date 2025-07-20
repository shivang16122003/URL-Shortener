package com.url.url_shortener.service;

import com.url.url_shortener.DTO.ClickEventDto;
import com.url.url_shortener.DTO.UrlMappingDto;
import com.url.url_shortener.models.ClickEvent;
import com.url.url_shortener.models.UrlMapping;
import com.url.url_shortener.models.User;
import com.url.url_shortener.repository.ClickEventRepository;
import com.url.url_shortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
@Autowired
private UrlMappingRepository urlMappingRepository;
private ClickEventRepository clickEventRepository;

    public UrlMappingDto shorten(User user,String ogUrl){
        String babyUrl=shortenUpShawty();
        UrlMapping urlMapping =new UrlMapping();
        urlMapping.setBabyUrl(babyUrl);
        urlMapping.setUser(user);
        urlMapping.setCreationDateTime(LocalDateTime.now());
        urlMapping.setOgUrl(ogUrl);

        urlMappingRepository.save(urlMapping);

        return convertToDto(urlMapping);



    }
    public static UrlMappingDto convertToDto(UrlMapping urlMapping){
        UrlMappingDto urlMappingDto=new UrlMappingDto();
        urlMappingDto.setBabyUrl(urlMapping.getBabyUrl());
        urlMappingDto.setUsername(urlMapping.getUser().getUsername());
        urlMappingDto.setOgUrl(urlMapping.getOgUrl());
        urlMappingDto.setBirthday(urlMapping.getCreationDateTime());
        urlMappingDto.setClickCount(urlMapping.getNoOFClicks());
        urlMappingDto.setId(urlMapping.getId());
        return urlMappingDto;
    }

    public static String shortenUpShawty(){
        StringBuilder babyUrl= new StringBuilder();
        String random="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random1=new Random();
        for(int i =0;i<7;i++){
            babyUrl.append(random.charAt(random1.nextInt(random.length())));
        }
        return babyUrl.toString();
    }


   public List<UrlMappingDto> findTheUrls(User user){
 List<UrlMapping > lst =urlMappingRepository.findUrlsByUser(user);

 return lst.stream().map(UserService::convertToDto).toList();
    }


  public List<ClickEventDto> countClicksOnDates(String shortUrl ,LocalDateTime start,LocalDateTime end){
        UrlMapping urlMapping=urlMappingRepository.findByBabyUrl(shortUrl);
        if(urlMapping!=null){
            return clickEventRepository.findByUrlMappingAndClickDateTimeBetween(urlMapping,start,end).stream().collect(Collectors.groupingBy(help->help.getClickDateTime().toLocalDate(), Collectors.counting())).entrySet().stream().
                    map(help->{
                        ClickEventDto clickEventDto=new ClickEventDto();
                        clickEventDto.setNoOfCount(help.getValue());
                        clickEventDto.setClickTimeAndDate(help.getKey());
                        return clickEventDto;

                    }


            ).collect(Collectors.toList());


        } return null;
  }

  public Map<LocalDate,Long> getClicksByUserAndDate(User user,LocalDate start,LocalDate end){
       List<UrlMapping> urlMapping=urlMappingRepository.findUrlsByUser(user);
       List<ClickEvent> clickEventList=clickEventRepository.findByUrlMappingInAndClickDateTimeBetween(urlMapping,start.atStartOfDay(),end.plusDays(1).atStartOfDay());
       return clickEventList.stream().collect(Collectors.groupingBy(help->help.getClickDateTime().toLocalDate(),Collectors.counting()));
  }



  public UrlMapping getOgUrl(String shortUrl){
        UrlMapping urlMapping=urlMappingRepository.findByBabyUrl(shortUrl);
        if(urlMapping!=null){
            urlMapping.setNoOFClicks(urlMapping.getNoOFClicks()+1);
            urlMappingRepository.save(urlMapping);


        ClickEvent clickEvent=new ClickEvent();
        clickEvent.setUrlMapping(urlMapping);
        clickEvent.setClickDateTime(LocalDateTime.now());
        clickEventRepository.save(clickEvent); }
      return urlMapping;

  }

}
